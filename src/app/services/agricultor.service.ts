import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Agricultor } from '../models/Agricultor';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class AgricultorService {
  private url = `${base_url}/agricultores`;
  private listaCambio = new Subject<Agricultor[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Agricultor[]> {
    return this.http.get<Agricultor[]>(this.url);
  }

  insert(agricultor: Agricultor): Observable<Agricultor> {
    return this.http.post<Agricultor>(this.url, agricultor);
  }

  registerFromUser(userId: number, data: any): Observable<any> {
    return this.http.post(`${this.url}/register-from-user/${userId}`, data);
  }

  getAgricultorByUsernameAndPassword(username: string, password: string): Observable<any> {
    return this.http.get(`${this.url}/find?username=${username}&password=${password}`);
  }

  setList(listaCambio: Agricultor[]) {
    this.listaCambio.next(listaCambio);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number): Observable<Agricultor> {
    return this.http.get<Agricultor>(`${this.url}/${id}`);
  }

  update(a: Agricultor): Observable<Agricultor> {
    return this.http.put<Agricultor>(this.url, a);
  }
}
