import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Empresa } from '../models/Empresa';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private url = `${base_url}/empresas`;
  private listaCambio = new Subject<Empresa[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.url);
  }

  insert(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.url, empresa);
  }

  registerFromUser(userId: number, data: any): Observable<any> {
    return this.http.post(`${this.url}/register-from-user/${userId}`, data);
  }

  getEmpresaByUsernameAndPassword(username: string, password: string): Observable<any> {
    return this.http.get(`${this.url}/find?username=${username}&password=${password}`);
  }

  setList(listaCambio: Empresa[]) {
    this.listaCambio.next(listaCambio);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.url}/${id}`);
  }

  update(e: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(this.url, e);
  }
}
