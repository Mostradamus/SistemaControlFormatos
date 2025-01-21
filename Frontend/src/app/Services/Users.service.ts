import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Environment/Environment';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {
  private myAppUrl: string;
  public myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.api;
    this.myApiUrl = 'api/v1/usuarios'
  }
  Login(usuario:any):Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/validar`, usuario)
  }
}
