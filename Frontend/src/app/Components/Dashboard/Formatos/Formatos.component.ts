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
  selector: 'app-formatos',
  template: `
    
  `,
  styles: ``,
  imports :[],
  providers: [MessageService]
})
export default class FormatsComponent implements OnInit {

  private _toast = inject(MessageService)
  ngOnInit() {
   
  }
  Registrar(){
   
  }
}
