import { Component, OnInit,inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { UsersService } from '../../Services/Users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {ToastModule} from 'primeng/toast'
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css'],
  providers:[UsersService, MessageService],
  imports: [
    ButtonModule,
    ListboxModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    CommonModule,
    ToastModule,
    InputTextModule,
  ]
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  private _toast = inject(MessageService)
  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }
 
   private _s = inject(UsersService);
   private _r = inject(Router);

  Login(){
    if(this.form.valid){
      const login: any ={
        username: this.form.get("username")?.value,
        userpassword: this.form.get("password")?.value
      }
      this._s.Login(login).subscribe({
        next:(token)=>{
          this._r.navigate(['/Dashboard/Home']);
          localStorage.setItem("token", token.token)
          localStorage.setItem("id", token.id)
        },
        error: (e: HttpErrorResponse)=>{
          console.log("error")
          this._toast.add({severity: 'contrast', summary: 'Credenciales', detail: e.error.msj})
        }

        
      })
    }
  }

}
