import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'; 
import { FormatsService } from '../../../Services/Formats.service';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reportes',
  templateUrl: './Reportes.component.html',
  styleUrls: ['./Reportes.component.css'],
  imports: 
  [CommonModule, CardModule, BadgeModule],
  providers: [FormatsService]
})
export default class ReportesComponent implements OnInit {

 public _R = inject(Router)
 public _f = inject(FormatsService)
 total = 0;
 totalP = 0;
  ngOnInit() {
    this._f.getTotalFormatosDetallesSp().subscribe((d:any)=>{
      console.log(d)
      this.total = d.totalHistorico;
      this.totalP = d.totalPendiente
    })
  }
  redireccionar(cmando:number){
    let ruta = "";
    switch(cmando){
        case 2: ruta = "Area";break;
    }
    this._R.navigate(["/Dashboard/Reportes/"+ruta])

  }

}
