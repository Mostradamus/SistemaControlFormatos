import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'; 
import { FormatsService } from '../../../Services/Formats.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import { ReportsService } from '../../../Services/Reports.service';
import { ComparisonResult } from '../../../Interfaces/ComparisonResult';
import { ComparisonResultDetails } from '../../../Interfaces/ComparisonResultDetails';
import { GetAreaCountByStatus } from '../../../Interfaces/sp';

@Component({
  selector: 'app-reportes',
  templateUrl: './Reportes.component.html',
  styleUrls: ['./Reportes.component.css'],
  imports: 
  [CommonModule, CardModule, BadgeModule, ButtonModule, SelectModule, DialogModule, ScrollPanelModule],
  providers: [FormatsService]
})
export default class ReportesComponent implements OnInit {

 public _R = inject(Router)
 public _f = inject(FormatsService)
 public _reports = inject(ReportsService)
 total = 0;
 totalP = 0;
 totalExcel = 0;
 nameTitle= '';
 visible: boolean = false;
 public report: ComparisonResult[]=[]
 public reportAreaContador: GetAreaCountByStatus[]=[]
 public reportDetails: ComparisonResultDetails[]=[]
  ngOnInit() {
    this._f.getTotalFormatosDetallesSp().subscribe((d:any)=>{
      console.log(d)
      this.total = d.totalHistorico;
      this.totalP = d.totalPendiente
      this.totalExcel = d.totalExcel
    })
    this._reports.GetReports().subscribe({
      next: (d: ComparisonResult[])=>{
        this.report = d
      }
    })
    
  }
  getFormattedName(it: any): string {
    const date = new Date(it.registration_date_comparison);
    const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}_${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}`;

    return `${it.name_area_comparison} - ${formattedDate}`;
}

  cargarExcel(id:any, file:string){
    console.log(id)
    this._reports.GetReportsID(id).subscribe({
      next: (l:any[])=>{
        console.log(l)
        this.reportDetails = l
        // const datosOrdenados = this.reportDetails.map(({ model_format,registration_date_comparison_details}) => ({
        //   model_format, registration_date_comparison_details
        // }));
        const datosOrdenados = this.reportDetails.map(({ model_format, registration_date_comparison_details }) => {
          const date = new Date(registration_date_comparison_details!);
      
          // Formato: dd/mm/yyyy hh:mm:ss
          const formattedDate = `${date.getDate().toString().padStart(2, '0')}/` +
                                `${(date.getMonth() + 1).toString().padStart(2, '0')}/` +
                                `${date.getFullYear()} ` +
                                `${date.getHours().toString().padStart(2, '0')}:` +
                                `${date.getMinutes().toString().padStart(2, '0')}:` +
                                `${date.getSeconds().toString().padStart(2, '0')}`;
      
          return { model_format, registration_date_comparison_details: formattedDate };
      });
      
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
        saveAs(data, file+'.xlsx');
      }
    })
     
  }
  abrirmodal(tipo:number){
    this.visible = true;
    const name = tipo == 2 ? "TOTAL REGISTROS PENDIENTES" : "TOTAL GENERAL REGISTRADOS"
    this.nameTitle = name;
    this._reports.GetReportsTotalCountArea(tipo).subscribe({
      next: (d: GetAreaCountByStatus[])=>{
        this.reportAreaContador = d
      }
    })
  }
  

}
