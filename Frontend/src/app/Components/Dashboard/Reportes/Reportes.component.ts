import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'; 
import { FormatsService } from '../../../Services/Formats.service';

@Component({
  selector: 'app-Reportes',
  templateUrl: './Reportes.component.html',
  styleUrls: ['./Reportes.component.css'],
  imports: 
  [CommonModule],
  providers: [FormatsService]
})
export default class ReportesComponent implements OnInit {

  private _f = inject(FormatsService)
  ngOnInit() {
  }
  excelData: any[] = [];  // Array donde almacenaremos los datos del Excel

  onFileChange(event: any) {
    const file = event.target.files[0];  // Obtén el archivo que el usuario selecciona
    if (file) {
      this.readExcel(file);  // Llama a la función para leer el archivo
    }
  }


  // readExcel(file: File) {
  //   const reader = new FileReader();
  //   reader.onload = (e: any) => {
  //     const binaryStr = e.target.result;
  //     const wb = XLSX.read(binaryStr, { type: 'binary' });
  //     const ws = wb.Sheets[wb.SheetNames[0]];
  //     const json = XLSX.utils.sheet_to_json(ws, { header: 1 });
  
  //     const startRow = 1;
  //     const data: any[] = json.slice(startRow);
  
  //     let extractedNumbers: number[] = []; // Array para almacenar los números encontrados
  
  //     this.excelData = data.map((row: any[]) => {
  //       return row.map((cell: any) => {
  //         if (typeof cell === 'string' && cell.includes('-')) {
  //           const parts = cell.split('-');
  //           const lastPart = parts[parts.length - 1].trim(); // Extrae la última parte después del último guion
  
  //           // Intentar convertirlo en número
  //           const num = Number(lastPart);
  //           if (!isNaN(num)) {
  //             extractedNumbers.push(num);
  //           }
  
  //           return lastPart;  
  //         }
  //         return cell;
  //       });
  //     });
  
  //     // Determinar el número menor y el mayor
  //     if (extractedNumbers.length > 0) {
  //       const minNumber = Math.min(...extractedNumbers);
  //       const maxNumber = Math.max(...extractedNumbers);
  
  //       console.log('Número menor:', minNumber);
  //       console.log('Número mayor:', maxNumber);
        
  //       this._f.comprobar(this.excelData, minNumber, maxNumber).subscribe(
  //         (response) => {
  //           console.log('Respuesta del backend:', response);
  //         },
  //         (error) => {
  //           console.error('Error al enviar los datos:', error);
  //         }
  //       );
  //     } else {
  //       console.log('No se encontraron números válidos en las celdas con guiones.');
  //     }
  
  //     console.log(this.excelData.length);
      
  //   };
  //   reader.readAsBinaryString(file);
  // }
  
  readExcel(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const binaryStr = e.target.result;
      const wb = XLSX.read(binaryStr, { type: 'binary' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const json: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });
  
      const startRow = 1;
      let groupedData: { [year: string]: number[] } = {}; // Agrupar por año
  
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
  
              const num = Number(lastPart);
              if (!isNaN(num)) {
                if (!groupedData[yearPart]) {
                  groupedData[yearPart] = [];
                }
                groupedData[yearPart].push(num);
              }
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
      const minNumber = Math.min(...numbers);
      const maxNumber = Math.max(...numbers);
      const formatsWithYear = numbers.map(num => `${selectedYear}-${num}`);
  
      console.log(`📤 Enviando datos del año ${selectedYear}:`, formatsWithYear);
      console.log(`🔹 Rango: ${minNumber} - ${maxNumber}`);
  
      // Llamada al backend SOLO con los datos del año seleccionado
      this._f.comprobar(formatsWithYear.join(','), minNumber, maxNumber).subscribe(
        (response) => {
          console.log(`✅ Respuesta del backend (año ${selectedYear}):`, response);
        },
        (error) => {
          console.error(`❌ Error al enviar los datos del año ${selectedYear}:`, error);
        }
      );
    };
  
    reader.readAsBinaryString(file);
  }
  

  onSubmit() {
    // Aquí puedes hacer algo con los datos (ej. enviarlos a un servidor, procesarlos, etc.)
    console.log(this.excelData);
  }

}
