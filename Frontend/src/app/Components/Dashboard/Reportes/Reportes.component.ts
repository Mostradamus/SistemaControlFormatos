import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'; 
import { FormatsService } from '../../../Services/Formats.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { BadgeModule } from 'primeng/badge';
import { Router } from '@angular/router';
import { ReportsService } from '../../../Services/Reports.service';
import { ComparisonResult } from '../../../Interfaces/ComparisonResult';

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
  

}
