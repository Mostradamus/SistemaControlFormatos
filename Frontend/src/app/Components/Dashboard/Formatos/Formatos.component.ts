import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CardModule} from 'primeng/card'
import {RippleModule} from 'primeng/ripple'
@Component({
  selector: 'app-formatos',
  templateUrl:'./Formatos.components.html',
  imports: [CardModule, RippleModule],
})
export default class FormatosComponent implements OnInit {

 public _R = inject(Router)
  ngOnInit() {
  }
  redireccionar(cmando:number){
    let ruta = "";
    switch(cmando){
        case 1:
            ruta = "Registro";
            break;
        case 2:
            ruta = "Lista";

            break;
    }
    this._R.navigate(["/Dashboard/Formatos/"+ruta])

  }

}
