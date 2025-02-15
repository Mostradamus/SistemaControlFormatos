import { Component, inject, OnInit } from '@angular/core';
import {CardModule} from 'primeng/card'
import {ButtonModule} from 'primeng/button'
import {AccordionModule} from 'primeng/accordion'
import {TableModule} from 'primeng/table'
import { Router } from '@angular/router';
import { Areas } from '../../../../Interfaces/Areas.i';
import { AreasService } from '../../../../Services/Areas.service';
import { CommonModule } from '@angular/common';
import { GetFormatDetailsByAreaAndDate, GetGroupedFormatsByDate } from '../../../../Interfaces/sp';
import { FormatsService } from '../../../../Services/Formats.service';
@Component({
  selector: 'app-revision',
  templateUrl: './Revision.component.html',
  styleUrls: ['./Revision.component.css'],

  imports:[CardModule, ButtonModule,AccordionModule,CommonModule, TableModule],
  providers:[AreasService, FormatsService]
})
export default class RevisionComponent implements OnInit {

  
  public _router = inject(Router);
  public lista!: GetGroupedFormatsByDate[];
  public data!: GetFormatDetailsByAreaAndDate[];
  private area = inject(AreasService)
  
public f = inject(FormatsService)
  visualizacion : {[key:string]:boolean} = {}
  activeArea: number | null = null; 
  activeArea2: number | null = null; 
  ngOnInit() {
   this.getDta();
    // this.area.GetInfoAreasRevisionDetalle()
  }
  getDta(){
    this.area.GetInfoAreasRevision().subscribe((data:GetGroupedFormatsByDate[])=>{
      this.lista = data
    })
  }
  Regresar(){
    this._router.navigate(["/Dashboard/Control"])

  }
  abrir(area: Number){
    console.log(area)
  }
  abriDetalle(item:any, estado:any){
    if (this.activeArea === item) {
      // Si ya está abierto, lo cerramos
      this.visualizacion[item] = false;
      this.activeArea = null;
      this.data = []; // Limpiar datos
    } else {
      // Cerrar todas las vistas
      this.visualizacion = {};
      this.activeArea = item;
      this.visualizacion[item] = true;
      console.log(item)
      // Cargar nueva data
      this.area.GetInfoAreasRevisionDetalle(item,estado).subscribe((data: GetFormatDetailsByAreaAndDate[]) => {
        console.log(data)
        this.data = data;
      });
    }
  }
  abrirDetalle2(item:any, estado:any){
    if (this.activeArea2 === item) {
      // Si ya está abierto, lo cerramos
      this.visualizacion[item] = false;
      this.activeArea2 = null;
      this.data = []; // Limpiar datos
    } else {
      // Cerrar todas las vistas
      this.visualizacion = {};
      this.activeArea2 = item;
      this.visualizacion[item] = true;

      // Cargar nueva data
      this.area.GetInfoAreasRevisionDetalle(item,estado).subscribe((data: GetFormatDetailsByAreaAndDate[]) => {
        this.data = data;
      });
    }
  }
  actualizarEstado(id: any){
    this.f.updateFormatsDetails(id).subscribe(()=>{
      this.getDta()
    })
  }
}
