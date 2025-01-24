import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../Services/Users.service';
import { Users } from '../../Interfaces/Users.i';
import {AvatarModule} from 'primeng/avatar'
import {RippleModule} from 'primeng/ripple'
import {ButtonModule} from 'primeng/button'
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
    imports: [AvatarModule,RippleModule,ButtonModule,RouterOutlet,RouterLink, RouterLinkActive],
    providers:[UsersService]
})
export  default class NavbarComponent implements OnInit {

 info: Users= {}
  private infos = inject(UsersService);
  private _R = inject(Router)
  ngOnInit() {
    this.infos.GetInfoUsuario(localStorage.getItem('id')).subscribe((data: Users)=>{
      this.info = data
    })
  }
  CerrarSession(){
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    this._R.navigate(['/Login'])
    
  }

}
