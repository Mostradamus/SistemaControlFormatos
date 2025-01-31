import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private inactivityTimeout: any;
    private inactivityDuration = 60 * 60 * 1000; // 1 hora en milisegundos
    private remainingTimeSubject = new BehaviorSubject<number>(0);
    remainingTime$ = this.remainingTimeSubject.asObservable();

  constructor(private router: Router) {
    this.startActivityListeners();
    this.resetInactivityTimer(); // Inicializa el temporizador
    this.startCountdown();
  }

  startActivityListeners() {
    window.addEventListener("mousemove", () => this.resetInactivityTimer());
    window.addEventListener("keydown", () => this.resetInactivityTimer());
    window.addEventListener("scroll", () => this.resetInactivityTimer());
    window.addEventListener("click", () => this.resetInactivityTimer());
    window.addEventListener("focus", () => this.resetInactivityTimer()); // Detecta si vuelve a la pestaña
  }
  startCountdown() {
    interval(1000).subscribe(() => {
      const expirationTime = parseInt(localStorage.getItem("token_expiration") || "0", 10);
      const timeLeft = expirationTime - new Date().getTime();

      if (timeLeft > 0) {
        this.remainingTimeSubject.next(timeLeft);
      } else {
        this.logout();
      }
    });
  }

  resetInactivityTimer() {
    clearTimeout(this.inactivityTimeout);

    const expirationTime = parseInt(localStorage.getItem("token_expiration") || "0", 10);
    const timeLeft = expirationTime - new Date().getTime();

    if (timeLeft > 0) {
      this.inactivityTimeout = setTimeout(() => {
        this.logout();
      }, timeLeft);
    } else {
      this.logout();
    }
  }

  setSession(token: string, id: string) {
    const expirationTime = new Date().getTime() + this.inactivityDuration;
    localStorage.setItem("token", token);
    localStorage.setItem("id", id);
    localStorage.setItem("token_expiration", expirationTime.toString());

    this.resetInactivityTimer();
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    const expiration = parseInt(localStorage.getItem("token_expiration") || "0", 10);
    return token !== null && new Date().getTime() < expiration;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("token_expiration");
    this.router.navigate(["/Login"]);
  }
}
