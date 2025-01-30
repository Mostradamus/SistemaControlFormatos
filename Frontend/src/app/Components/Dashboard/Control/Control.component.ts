import { Component, OnInit } from '@angular/core';
import {CardModule} from 'primeng/card'
@Component({
  selector: 'app-control',
  templateUrl: './Control.component.html',
  styleUrls: ['./Control.component.css'],

  imports: [CardModule]
})
export default class ControlComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
