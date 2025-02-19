import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {CardModule} from 'primeng/card'
import {ButtonModule} from 'primeng/button'
import {AccordionModule} from 'primeng/accordion'
import {Table, TableModule} from 'primeng/table'
import { Router } from '@angular/router';
import { Areas } from '../../../../Interfaces/Areas.i';
import { DatePickerModule } from 'primeng/datepicker';
import { AreasService } from '../../../../Services/Areas.service';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ScrollPanelModule } from 'primeng/scrollpanel';
//
import { DropdownModule } from 'primeng/dropdown'
import { SliderModule } from 'primeng/slider'
import { GetFormatDetailsByAreaAndDate, GetGroupedFormatsByDate } from '../../../../Interfaces/sp';
import { FormatsService } from '../../../../Services/Formats.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-revision',
  templateUrl: './Revision.component.html',
  styleUrls: ['./Revision.component.css'],

  imports:[CardModule, ButtonModule,AccordionModule,FormsModule,ReactiveFormsModule,IconFieldModule,
    InputIconModule,InputTextModule,
    DropdownModule, CommonModule,FloatLabelModule, TableModule,ScrollPanelModule, DatePickerModule, SliderModule],
  providers:[AreasService, FormatsService]
})
export default class RevisionComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  
  public _router = inject(Router);
  public lista!: GetGroupedFormatsByDate[];
  public data!: GetFormatDetailsByAreaAndDate[];
  private area = inject(AreasService)
  date: Date | undefined;
  activityValues: number[] = [0, 100];
  fechaInicio: Date | undefined;
  fechaFin: Date | undefined;
  formGroup!: FormGroup ;
  es: any;
  public f = inject(FormatsService)
  visualizacion : {[key:string]:boolean} = {}
  activeArea: number | null = null; 
  activeArea2: number | null = null; 
  ngOnInit() {
   this.getDta();
   this.formGroup = new FormGroup({
    date: new FormControl<Date | null>(null),
    date2: new FormControl<Date | null>(null)
});
   this.fechaFin = new Date(); // Fecha actual
    this.fechaInicio = new Date();
    this.fechaInicio.setDate(this.fechaFin.getDate() - 10); 
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
  formatDate(date: Date): string {
    if (!date) return ''; // Manejar caso de fecha vacía
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Asegurar 2 dígitos
    const day = String(date.getDate()).padStart(2, '0'); // Asegurar 2 dígitos
    return `${year}-${month}-${day}`;
}
onDateChange() {
  this.activeArea = null;
  this.visualizacion = {};
  this.data = [];
}
  abriDetalle(item:any, estado:any){
    if (this.activeArea === item) {
      // Si ya está abierto, lo cerramos
      this.visualizacion[item] = false;
      this.activeArea = null;
      this.data = [];
    } else {
      // Cerrar todas las vistas
      const fechaInicioFormatted = this.fechaInicio ? this.formatDate(this.fechaInicio) : '';
      const fechaFinFormatted = this.fechaFin ? this.formatDate(this.fechaFin) : '';

      this.visualizacion = {};
      this.activeArea = item;
      this.visualizacion[item] = true;
      this.getInfoAreasRevision(item,estado, fechaInicioFormatted, fechaFinFormatted);
    
    }
  }
  getInfoAreasRevision(item:any,estado:any, fechaInicioFormatted:any, fechaFinFormatted:any){
    this.area.GetInfoAreasRevisionDetalle(item,estado, fechaInicioFormatted, fechaFinFormatted).subscribe((data: GetFormatDetailsByAreaAndDate[]) => {
      this.data = data;
    });
  }
  applyFilter(value: string) {
    // Llama al método de filtrado de tu tabla aquí
    this.dt.filterGlobal(value, 'contains');
  }
  actualizarEstado(id: any){
    this.f.updateFormatsDetails(id).subscribe(()=>{
      this.getDta()
    })
  }
}
