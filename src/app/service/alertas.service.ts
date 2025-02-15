import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alerta } from '../model/alerta';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  private apiUrl = 'https://9ui00w75xh.execute-api.us-east-1.amazonaws.com/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  obtenerAlertas(): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(this.apiUrl + "alertas")
  }

  atenderAlerta(id:number): Observable<Alerta>{
    return this.http.put<Alerta>(`${this.apiUrl}/alertas/${id}/atender`, this.httpOptions);
  }

}
