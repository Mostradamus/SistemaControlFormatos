import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CardModule} from 'primeng/card'
@Component({
  selector: 'app-control',
  templateUrl: './Control.component.html',
  styleUrls: ['./Control.component.css'],

  imports: [CardModule]
})
export default class ControlComponent implements OnInit {

  
 public _R = inject(Router)
  ngOnInit() {
  }
  redireccionar(cmando:number){
    let ruta = "";
    switch(cmando){
        case 1: ruta = "Revision";break;
        case 2: ruta = "Areas";   break;
        case 3: ruta = "CompararFormatos"; break;
    }
    this._R.navigate(["/Dashboard/Control/"+ruta])

  }


}
