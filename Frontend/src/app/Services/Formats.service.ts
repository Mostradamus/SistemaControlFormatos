import { Injectable } from '@angular/core';
import { environment } from '../Environment/Environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class FormatsService {
  private myAppUrl: string;
  public myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.api;
    this.myApiUrl = 'api/v1/formatos';
  }
  getAllFormats(): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}`);
  }

  createFormat(formatData: any): Observable<any> {
    return this.http.post(
      `${this.myAppUrl}${this.myApiUrl}/crear`,
      formatData
    );
  }

  deleteFormat(formatId: string): Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/eliminar`, {
      params: { id: formatId },
    });
  }

  getAllFormatsSp(): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/Lista`);
  }
  updateFormatsDetails(id: any): Observable<any>{
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/actualizarEstado/${id}`, {
    });
  }
  comprobar(formatData:any):Observable<any>{
    const payload = { formatsModel: formatData };
    console.log(formatData)
     return this.http.post(
      `${this.myAppUrl}${this.myApiUrl}/comprobar/formatos`,
      payload
    );
  }
}
