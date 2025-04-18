import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environment/Environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

private myAppUrl: string;
  public myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.api;
    this.myApiUrl = 'api/v1/reportes';
  }
  GetReports(): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}`);
  }
  GetReportsID(id: any): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/archivo/${id}`);
  }
  GetReportsTotalCountArea(id: any): Observable<any> {
    console.log(id)
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/totales/${id}`);
  }
}
