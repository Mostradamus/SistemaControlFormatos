import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DividerModule} from 'primeng/divider'
import {InputTextModule} from 'primeng/inputtext'
import { Select } from 'primeng/select';
import { ButtonModule} from 'primeng/button'

import { CommonModule } from '@angular/common';
import { FormatsService } from '../../../Services/Formats.service';
import { Formats } from '../../../Interfaces/Formats.i';
import { HttpErrorResponse } from '@angular/common/http';
import {ToastModule} from 'primeng/toast'
import { MessageService } from 'primeng/api';

interface City {
  name: string;
  id: number;
}
@Component({
  selector: 'app-Registro',
  templateUrl: './Registro.component.html',
  styleUrls: ['./Registro.component.css',],
  imports :[DividerModule,InputTextModule, ReactiveFormsModule, FormsModule, CommonModule,Select,ButtonModule,ToastModule],
  providers: [FormatsService,MessageService]
})
export default class RegistroComponent implements OnInit {

  cities: City[] | undefined;
  formulario!: FormGroup;
  selectedCity: City | undefined;
  private _fmt = inject(FormatsService)
  private _toast = inject(MessageService)
  ngOnInit() {
    this.cities = [
      { name: 'DIA',id:1 },
      { name: 'TARDE',id: 2 },
    ];

    this.formulario = new FormGroup({
          nroFormato: new FormControl('', Validators.required),
          cantidad: new FormControl('', Validators.required),
          turno: new FormControl('', Validators.required),
          descripcion: new FormControl('', Validators.required)
        })
  }
  Registrar(){
    if(this.formulario.valid){
      const formats: any = {
        starting_order: this.formulario.get("nroFormato")?.value,
        total: this.formulario.get("cantidad")?.value,
        turn: this.formulario.get("turno")?.value,
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
}
