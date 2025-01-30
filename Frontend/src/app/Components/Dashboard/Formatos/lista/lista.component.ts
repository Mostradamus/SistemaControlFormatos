import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { sp_mostrar_formats } from '../../../../Interfaces/sp_mostrar_formats';
import { FormatsService } from '../../../../Services/Formats.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  imports:[TableModule, CommonModule, CardModule],
  providers: [FormatsService]
})
export default class ListaComponent implements OnInit {

  public dataF!: sp_mostrar_formats[];
   private _F = inject(FormatsService)
   ngOnInit() {
     this._F.getAllFormatsSp().subscribe((data: sp_mostrar_formats[])=>{
       this.dataF = data;
     })
    
   }
}
