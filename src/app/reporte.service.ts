import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private baseUrl = 'http://localhost:8080/agricultores'; // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient) {}

  agricultorConMasProductos(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/reporte5`);
  }
}