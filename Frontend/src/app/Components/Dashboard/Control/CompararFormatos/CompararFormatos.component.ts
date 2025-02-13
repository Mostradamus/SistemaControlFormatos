import { Component, inject, OnInit } from '@angular/core';
import {CardModule} from 'primeng/card'
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { BadgeModule } from 'primeng/badge';
import * as XLSX from 'xlsx'; 
import { FormatsService } from '../../../../Services/Formats.service';
import { verificar_formats_modelos_rango2 } from '../../../../Interfaces/sp';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
@Component({
  selector: 'app-compararformatos',
  templateUrl: './CompararFormatos.component.html',
  styleUrls: ['./CompararFormatos.component.css'],
  providers: [FormatsService],
  imports: [CardModule,ButtonModule,FileUploadModule, BadgeModule, CommonModule, RippleModule,ScrollingModule ]
})
export default class CompararFormatosComponent implements OnInit {

  constructor() { }
  mostrarResultados: boolean = false; 
  public uniqueAreas: { area: string, count: number }[] = [];
  selectedArea: string | null = null; 
  ngOnInit() {
  }
  private _f = inject(FormatsService)
  excelData: any[] = [];  // Array donde almacenaremos los datos del Excel
  listaDetalles : verificar_formats_modelos_rango2[] = []
  listaDetallesArea : verificar_formats_modelos_rango2[] = []
  totalResultado = 0;

  choose(event: any, callback: any) {
    // Obtén el archivo seleccionado
    callback();
    
  }

  onFileChange(event: any) {
    console.log(event)
    const file = event.files[0];  // Obtén el archivo que el usuario selecciona
    if (file) {
      this.readExcel(file);  // Llama a la función para leer el archivo
    }// Ejecuta la callback después de procesar el archivo
  }
  
  readExcel(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const binaryStr = e.target.result;
      const wb = XLSX.read(binaryStr, { type: 'binary' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const json: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });
  
      const startRow = 1;
      let groupedData: { [year: string]: string[] } = {}; // Agrupar por año
  
      // Verificar si hay datos suficientes
      if (!json || json.length <= startRow) {
        console.error("❌ El archivo Excel no tiene suficientes datos.");
        return;
      }
  
      this.excelData = json.slice(startRow).map((row) => {
        if (!Array.isArray(row)) return []; // Si la fila no es un array, ignorarla
  
        return row.map((cell) => {
          if (typeof cell === 'string' && cell.includes('-')) {
            const parts = cell.split('-');
  
            if (parts.length === 3) {
              const yearPart = parts[1].trim(); // Extraer el año (Ej: "25")
              const lastPart = parts[2].trim(); // Extraer el número correlativo (Ej: "00000662")
  
              //const num = Number(lastPart);
              // if (!isNaN(num)) {
                if (!groupedData[yearPart]) {
                  groupedData[yearPart] = [];
                }
                groupedData[yearPart].push(lastPart);
              // }
              return `${yearPart}-${lastPart}`;
            }
          }
          return cell;
        });
      });
  
      // Obtener los años únicos
      const years = Object.keys(groupedData).map(Number);
      if (years.length === 0) {
        console.log("❌ No se encontraron años válidos.");
        return;
      }
  
      let selectedYear: number;
      if (years.length === 1) {
        // Si solo hay un año, usar ese
        selectedYear = years[0];
      } else {
        // Si hay varios, tomar el menor
        selectedYear = Math.min(...years);
      }
  
      console.log(`🔹 Año seleccionado: ${selectedYear}`);
  
      // Verificar si hay datos para el año seleccionado
      if (!groupedData[selectedYear] || groupedData[selectedYear].length === 0) {
        console.log(`⚠ No hay registros para el año ${selectedYear}.`);
        return;
      }
  
      // Obtener el rango de números del año seleccionado
      const numbers = groupedData[selectedYear];
      // Convertir los valores a números para calcular el min y max
      const numericNumbers = numbers.map(num => Number(num)); // Convertir los números de string a número

      const minNumber = Math.min(...numericNumbers); // Obtener el valor mínimo
      const maxNumber = Math.max(...numericNumbers);
      const formatsWithYear = numbers.map(num => `${selectedYear}-${num}`);
  
      console.log(`📤 Enviando datos del año ${selectedYear}:`, formatsWithYear);
      console.log(`🔹 Rango: ${minNumber} - ${maxNumber}`);
  
      // Llamada al backend SOLO con los datos del año seleccionado
      this._f.comprobar(formatsWithYear.join(','), minNumber, maxNumber).subscribe(
        (response) => {
          this.totalResultado= response.count;
          this.processResponse(response);
          this.mostrarResultados = false;
          console.log(this.uniqueAreas)
          this.listaDetalles = response.lista
          // console.log(`✅ Respuesta del backend (año ${selectedYear}):`, response);
        },
        (error) => {
          console.error(`❌ Error al enviar los datos del año ${selectedYear}:`, error);
        }
      );
    };
  
    reader.readAsBinaryString(file);
  }
  processResponse(response: any): void {
    // Asumimos que response.lista contiene los datos
    if (response && response.lista) {
      // Calcular las áreas únicas y sus conteos
      this.uniqueAreas = this.getUniqueAreas(response.lista);

      console.log(this.uniqueAreas); // Muestra las áreas con el conteo
    }
  }
 
  getUniqueAreas(data: any[]): { area: string, count: number }[] {
    // Obtener todas las áreas
    const areas = data.map(item => item.area);

    // Eliminar duplicados utilizando un Set
    const uniqueAreasSet = new Set(areas);

    // Crear un array de objetos con cada área y su respectivo conteo
    return Array.from(uniqueAreasSet).map(area => ({
      area,
      count: data.filter(item => item.area === area).length
    }));
  }
  uploadEvent(callback:any) {
    callback();
  }
  mostarDetallesPenientes(area:any){
    this.listaDetallesArea = this.listaDetalles.filter(r => r.area == area);
    console.log(this.listaDetallesArea)
    this.mostrarResultados = true;
    this.selectedArea = area;

  }

}
