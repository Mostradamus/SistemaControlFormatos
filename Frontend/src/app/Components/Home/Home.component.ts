import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../Services/Users.service';
import { Users } from '../../Interfaces/Users.i';
import {AvatarModule} from 'primeng/avatar'
import {RippleModule} from 'primeng/ripple'
@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
  imports: [AvatarModule,RippleModule],
  providers:[UsersService]
})
export class HomeComponent implements OnInit {

  info: Users= {}
  private infos = inject(UsersService);
  ngOnInit() {
    this.infos.GetInfoUsuario(localStorage.getItem('id')).subscribe((data: Users)=>{
      this.info = data
    })
  }

}
