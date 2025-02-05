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


  readExcel(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const binaryStr = e.target.result;
      const wb = XLSX.read(binaryStr, { type: 'binary' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(ws, { header: 1 });  // Convierte a un array de arrays (sin procesar aún)

      // Configuración para empezar a procesar desde la fila 2 (índice 1)
      const startRow = 1; // Desde la fila 2 (índice 1)
      
      // Filtramos los datos a partir de la fila de inicio
      //const data = json.slice(startRow);  // Los datos empiezan desde la fila 2 (índice 1)
      const data: any[] = json.slice(startRow);
      // Procesar cada celda para extraer solo la parte después del último guion
      this.excelData = data.map((row: any[]) => {
        // Aseguramos que `row` sea un array y procesamos cada celda
        return row.map((cell: any) => {
          // Verificamos si la celda es una cadena y contiene guiones
          if (typeof cell === 'string' && cell.includes('-')) {
            const parts = cell.split('-');
            // Tomamos la última parte después del último guion
            return parts[parts.length - 1];  
          }
          return cell;  // Si no tiene guion o no es cadena, devolvemos el valor original
        });
      });

      console.log(this.excelData);  // Muestra los datos procesados
      this._f.comprobar(this.excelData).subscribe(
        (response) => {
          console.log('Respuesta del backend:', response);
        },
        (error) => {
          console.error('Error al enviar los datos:', error);
        }
      );
    };
    reader.readAsBinaryString(file);  // Lee el archivo como un string binario
  }


  onSubmit() {
    // Aquí puedes hacer algo con los datos (ej. enviarlos a un servidor, procesarlos, etc.)
    console.log(this.excelData);
  }

}
