import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../../Services/Users.service';
import { Users } from '../../../Interfaces/Users.i';
import {CardModule} from 'primeng/card'
import {RippleModule} from 'primeng/ripple'
import {ButtonModule} from 'primeng/button'
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabsModule } from 'primeng/tabs';
@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
  imports: [CardModule,RippleModule, ScrollPanelModule, TabsModule],
  providers:[UsersService]
})
export default class HomeComponent implements OnInit {

  listaServicios: string [] = []
  ngOnInit() {
   this.listaServicios = [ "MEDICINA GENERAL", "OBSTETRICIA", "LABORATORIO", "CONTROL DE NIÑO", "FARMACIA", "TBC", "DENGUE", "ECOGRAFIA", "ADMISION", "CAJA"]
  }
  

}
