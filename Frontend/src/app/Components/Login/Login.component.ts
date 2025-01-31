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

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css'],
  providers:[UsersService],
  imports: [
    ButtonModule,
    ListboxModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    CommonModule,
    InputTextModule,
  ]
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }
 
   private _s = inject(UsersService);
   private _r = inject(Router);

   Login() {
    if (this.form.valid) {
      const login: any = {
        username: this.form.get("username")?.value,
        userpassword: this.form.get("password")?.value
      };
  
      this._s.Login(login).subscribe({
        next: (token) => {
          this._r.navigate(['/Dashboard/Home']);
  
          const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1 hora en milisegundos
          localStorage.setItem("token", token.token);
          localStorage.setItem("id", token.id);
          localStorage.setItem("token_expiration", expirationTime.toString());
  
          this.startTokenExpirationTimer(); // Iniciar temporizador
        },
        error: (e: HttpErrorResponse) => {
          console.log("error");
        }
      });
    }
  }
  
  /**
   * Inicia el temporizador para eliminar el token cuando expire
   */
  startTokenExpirationTimer() {
    const expirationTime = parseInt(localStorage.getItem("token_expiration") || "0", 10);
    const timeLeft = expirationTime - new Date().getTime();
  
    if (timeLeft > 0) {
      setTimeout(() => {
        this.logout();
      }, timeLeft);
    } else {
      this.logout();
    }
  }
  
  /**
   * Cierra la sesión y redirige al login
   */
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("token_expiration");
    this._r.navigate(["/Login"]); // Redirigir al login
  }
  

}
