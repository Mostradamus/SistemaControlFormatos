import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rende-html',
  template: `<div class="p-3" [innerHTML]="content"></div>`,
  styleUrls: ['./rende-html.component.css'],
})
export class RendeHtmlComponent implements OnInit {
  @Input() content: string = ''; 
  ngOnInit(): void {
    
  }

}
