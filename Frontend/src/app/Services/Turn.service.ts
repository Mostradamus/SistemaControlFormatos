import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Environment/Environment';
import { Observable } from 'rxjs';

@Injectable()
export class TurnService {
  private myAppUrl: string;
  public myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.api;
    this.myApiUrl = 'api/v1/turnos';
  }
  GetInfoTurno(): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}`);
  }
}
