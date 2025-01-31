import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from './Services/AuthService.service';
import { SessionTimerComponentComponent } from './Components/SessionTimerComponent/SessionTimerComponent.component';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ButtonModule,
    ListboxModule,
    FormsModule,
    CheckboxModule,
    InputTextModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
}
