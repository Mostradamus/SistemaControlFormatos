import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormatsService } from '../../../../Services/Formats.service';
import { getTotalArea } from '../../../../Interfaces/sp';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'app-areas',
  templateUrl: './Areas.component.html',
  styleUrls: ['./Areas.component.css'],
  imports: [CardModule, ButtonModule,ScrollPanelModule],
  providers: [FormatsService],
})
export default class AreasComponent implements OnInit {
  public _formats = inject(FormatsService);
  public _total!: getTotalArea[];
  public _router = inject(Router);
  ngOnInit() {
    this._formats.getTotalAreaSp().subscribe((data: getTotalArea[]) => {
      this._total = data;
    });
  }
  Regresar() {
    this._router.navigate(['/Dashboard/Control']);
  }
}
