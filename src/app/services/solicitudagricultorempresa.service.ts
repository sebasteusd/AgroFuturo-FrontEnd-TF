import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Subject } from 'rxjs';
import { SolicitudAgricultorEmpresa } from '../models/SolicitudAgricultorEmpresa';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class SolicitudagricultorempresaService {
  private url=`${base_url}/solicitudagricultorempresas`
  private listaCambio = new Subject<SolicitudAgricultorEmpresa[]>()
  constructor(private http:HttpClient) { }
  list() {
    return this.http.get<SolicitudAgricultorEmpresa[]>(this.url).pipe(
      map((soli: SolicitudAgricultorEmpresa[]) => soli.sort((a, b) => a.idSolicitudAgricultorEmpresa - b.idSolicitudAgricultorEmpresa)) 
    );
  }
  
  insert(soli:SolicitudAgricultorEmpresa){
    return this.http.post(this.url, soli)
  }

  setList(listaCambio: SolicitudAgricultorEmpresa[]){
    this.listaCambio.next(listaCambio)
  }
  getList(){
    return this.listaCambio.asObservable()
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number){
    return this.http.get<SolicitudAgricultorEmpresa>(`${this.url}/${id}`)
  }
  update(s:SolicitudAgricultorEmpresa){
    return this.http.put(this.url, s)
  }
}
