import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'; 
import { FormatsService } from '../../../Services/Formats.service';

@Component({
  selector: 'app-Reportes',
  templateUrl: './Reportes.component.html',
  styleUrls: ['./Reportes.component.css'],
  imports: 
  [CommonModule],
  providers: [FormatsService]
})
export default class ReportesComponent implements OnInit {

  ngOnInit() {
  }
 
}
