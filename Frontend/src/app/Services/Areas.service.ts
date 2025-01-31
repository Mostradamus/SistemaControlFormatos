import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Environment/Environment';
import { Observable } from 'rxjs';

@Injectable()
export class AreasService {
  private myAppUrl: string;
  public myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.api;
    this.myApiUrl = 'api/v1/areas';
  }
  GetInfoAreas(): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}`);
  }
  GetInfoAreasRevision(): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/revision`);
  }
  GetInfoAreasRevisionDetalle(id:number, estado: number): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/detalles/${id}/estado/${estado}`);
  }
}
