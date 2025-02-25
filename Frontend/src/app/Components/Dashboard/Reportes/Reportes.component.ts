import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'; 
import { FormatsService } from '../../../Services/Formats.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { BadgeModule } from 'primeng/badge';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import { ReportsService } from '../../../Services/Reports.service';
import { ComparisonResult } from '../../../Interfaces/ComparisonResult';
import { ComparisonResultDetails } from '../../../Interfaces/ComparisonResultDetails';

@Component({
  selector: 'app-reportes',
  templateUrl: './Reportes.component.html',
  styleUrls: ['./Reportes.component.css'],
  imports: 
  [CommonModule, CardModule, BadgeModule, ButtonModule, SelectModule],
  providers: [FormatsService]
})
export default class ReportesComponent implements OnInit {

 public _R = inject(Router)
 public _f = inject(FormatsService)
 public _reports = inject(ReportsService)
 total = 0;
 totalP = 0;
 public report: ComparisonResult[]=[]
 public reportDetails: ComparisonResultDetails[]=[]
  ngOnInit() {
    this._f.getTotalFormatosDetallesSp().subscribe((d:any)=>{
      console.log(d)
      this.total = d.totalHistorico;
      this.totalP = d.totalPendiente
    })
    this._reports.GetReports().subscribe({
      next: (d: ComparisonResult[])=>{
        this.report = d
      }
    })
  }
  cargarExcel(id:any){
    console.log(id)
    this._reports.GetReportsID(id).subscribe({
      next: (l:any[])=>{
        console.log(l)
        this.reportDetails = l
        const datosOrdenados = this.reportDetails.map(({ model_format,registration_date_comparison_details}) => ({
          model_format, registration_date_comparison_details
        }));
      
        // Crear hoja de cálculo con el nuevo orden
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosOrdenados);
      
        // Agregar cabeceras en la primera fila
        const header = [['FORMATO','FECHA']];
        XLSX.utils.sheet_add_aoa(ws, header, { origin: 'A1' });
      
        // Ajustar ancho de columnas
        ws['!cols'] = [
          { wch: 20 }, // Cargo
          { wch: 20 }, // Edad
        ];
      
        // Crear el libro de trabajo y agregar la hoja
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Reporte');
      
        // Escribir el archivo Excel
        const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data: Blob = new Blob([excelBuffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        });
      
        // Descargar el archivo
        saveAs(data, 'Reporte11.xlsx');
      }
    })
     
  }
  

}
