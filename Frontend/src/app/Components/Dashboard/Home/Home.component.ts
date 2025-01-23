import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../../Services/Users.service';
import { Users } from '../../../Interfaces/Users.i';
import {CardModule} from 'primeng/card'
import {RippleModule} from 'primeng/ripple'
import {ButtonModule} from 'primeng/button'
@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
  imports: [CardModule,RippleModule,ButtonModule],
  providers:[UsersService]
})
export default class HomeComponent implements OnInit {

  info: Users= {}
  private infos = inject(UsersService);
  ngOnInit() {
    this.infos.GetInfoUsuario(localStorage.getItem('id')).subscribe((data: Users)=>{
      this.info = data
    })
  }
  CerrarSession(){
    
  }

}
