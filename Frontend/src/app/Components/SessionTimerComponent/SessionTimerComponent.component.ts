import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/AuthService.service';

@Component({
  selector: 'app-SessionTimerComponent',
  templateUrl: './SessionTimerComponent.component.html',
  styleUrls: ['./SessionTimerComponent.component.css']
})
export class SessionTimerComponentComponent implements OnInit {

  remainingMinutes: number = 0;
  remainingSeconds: number = 0;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.remainingTime$.subscribe((timeLeft) => {
      this.remainingMinutes = Math.floor(timeLeft / 60000);
      this.remainingSeconds = Math.floor((timeLeft % 60000) / 1000);
    });
  }
}
