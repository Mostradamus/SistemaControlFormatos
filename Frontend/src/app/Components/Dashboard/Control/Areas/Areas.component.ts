import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-areas',
  templateUrl: './Areas.component.html',
  styleUrls: ['./Areas.component.css'],

    imports:[CardModule, ButtonModule]
})
export default class AreasComponent implements OnInit {
 public _router = inject(Router);
  ngOnInit() {
  }
  Regresar(){
    this._router.navigate(["/Dashboard/Control"])
  }

}
