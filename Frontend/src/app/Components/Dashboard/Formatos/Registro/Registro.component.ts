import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DividerModule} from 'primeng/divider'
import {InputTextModule} from 'primeng/inputtext'
import { Select } from 'primeng/select';
import { ButtonModule} from 'primeng/button'

import { CommonModule } from '@angular/common';
import { FormatsService } from '../../../../Services/Formats.service';
import { Formats } from '../../../../Interfaces/Formats.i';
import { HttpErrorResponse } from '@angular/common/http';
import {ToastModule} from 'primeng/toast'
import { MessageService } from 'primeng/api';
import { AreasService } from '../../../../Services/Areas.service';
import { TurnService } from '../../../../Services/Turn.service';
import { Areas } from '../../../../Interfaces/Areas.i';
import { Turn } from '../../../../Interfaces/Turn.i';
import { Router } from '@angular/router';

interface City {
  name: string;
  id: number;
}
@Component({
  selector: 'app-Registro',
  templateUrl: './Registro.component.html',
  styleUrls: ['./Registro.component.css',],
  imports :[DividerModule,InputTextModule, ReactiveFormsModule, FormsModule, CommonModule,Select,ButtonModule,ToastModule],
  providers: [FormatsService,MessageService,AreasService,TurnService]
})
export default class RegistroComponent implements OnInit {

  areas: Areas[] | undefined;
  turnos: Turn[] | undefined;
  formulario!: FormGroup;
  selectedCity: City | undefined;
  private _fmt = inject(FormatsService)
  private _toast = inject(MessageService)
  private _area = inject(AreasService)
  private _turno = inject(TurnService)
  public _router = inject(Router);
  ngOnInit() {
    this._turno.GetInfoTurno().subscribe((data:Turn[])=>{
      this.turnos = data;
    })
    this._area.GetInfoAreas().subscribe((data:Areas[])=>{
      this.areas = data;
    })

    this.formulario = new FormGroup({
          nroFormato: new FormControl('', [Validators.required, Validators.maxLength(8)]),
          cantidad: new FormControl('', Validators.required),
          turno: new FormControl('', Validators.required),
          area: new FormControl('', Validators.required),
          descripcion: new FormControl('', Validators.required)
        })
  }
  Registrar(){
    if(this.formulario.valid){
      const formats: any = {
        starting_order: this.formulario.get("nroFormato")?.value,
        total: this.formulario.get("cantidad")?.value,
        id_turn: this.formulario.get("turno")?.value,
        id_area: this.formulario.get("area")?.value,
        description: this.formulario.get("descripcion")?.value,
      }
      console.log('antes de enviar')
      this._fmt.createFormat(formats).subscribe({
        next: (d)=>{
          this._toast.add({severity: 'success', summary: 'Registro', detail: d.msj})
          this.formulario.reset();
        },error: (e: HttpErrorResponse)=>{
          this._toast.add({severity: 'warn', summary: 'Registro', detail: e.error.msj})
        }
      })
    }
  }
  Regresar(){
    this._router.navigate(["/Dashboard/Formatos"])
  }
}
