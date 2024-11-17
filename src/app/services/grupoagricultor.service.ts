import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Subject } from 'rxjs';
import { GrupoAgricultor } from '../models/GrupoAgricultor';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class GrupoagricultorService {
  private url=`${base_url}/grupoAgricultor`
  private listaCambio = new Subject<GrupoAgricultor[]>()
  constructor(private http:HttpClient) { }
  list() {
    return this.http.get<GrupoAgricultor[]>(this.url).pipe(
      map((productos: GrupoAgricultor[]) => productos.sort((a, b) => a.idGrupo- b.idGrupo)) 
    );
  }
  
  insert(grupos:GrupoAgricultor){
    return this.http.post(this.url, grupos)
  }

  setList(listaCambio: GrupoAgricultor[]){
    this.listaCambio.next(listaCambio)
  }
  getList(){
    return this.listaCambio.asObservable()
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number){
    return this.http.get<GrupoAgricultor>(`${this.url}/${id}`)
  }
  update(g:GrupoAgricultor){
    return this.http.put(this.url, g)
  }
}
