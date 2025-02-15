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
    DropdownModule, CommonModule,FloatLabelModule, TableModule, DatePickerModule, SliderModule],
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
    this.fechaInicio.setDate(this.fechaFin.getDate() - 7); 
  //  this.es = {
  //   firstDayOfWeek: 1,
  //   dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
  //   dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
  //   dayNamesMin: ["D", "L", "M", "O", "J", "V", "S"],
  //   monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
  //   monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
  //   today: "Hoy",
  //   clear: "Borrar"
  // };
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
