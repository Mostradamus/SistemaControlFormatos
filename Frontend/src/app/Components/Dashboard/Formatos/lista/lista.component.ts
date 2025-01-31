import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { sp_mostrar_formats } from '../../../../Interfaces/sp_mostrar_formats';
import { FormatsService } from '../../../../Services/Formats.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  imports:[TableModule, CommonModule, CardModule, ButtonModule],
  providers: [FormatsService]
})
export default class ListaComponent implements OnInit {

  public dataF!: sp_mostrar_formats[];
   private _F = inject(FormatsService)
     public _router = inject(Router);
   ngOnInit() {
     this._F.getAllFormatsSp().subscribe((data: sp_mostrar_formats[])=>{
       this.dataF = data;
     })
    
   }
   Regresar(){
    this._router.navigate(["/Dashboard/Formatos"])
  }
}
