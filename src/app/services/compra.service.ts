import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Subject, Observable } from 'rxjs';
import { Compra } from '../models/Compra';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private url = `${base_url}/compras`;
  private listaCambio = new Subject<Compra[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Compra[]> {
    return this.http.get<Compra[]>(this.url).pipe(
      map((compras: Compra[]) => compras.sort((a, b) => a.idCompra - b.idCompra))
    );
  }

  insert(compras: Compra): Observable<Compra> {
    return this.http.post<Compra>(this.url, compras);
  }

  setList(listaCambio: Compra[]): void {
    this.listaCambio.next(listaCambio);
  }

  getList(): Observable<Compra[]> {
    return this.listaCambio.asObservable();
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  listId(id: number): Observable<Compra> {
    return this.http.get<Compra>(`${this.url}/${id}`);
  }

  update(c: Compra): Observable<Compra> {
    return this.http.put<Compra>(this.url, c);
  }
}