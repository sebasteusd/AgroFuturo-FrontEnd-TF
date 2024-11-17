import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map,Subject } from 'rxjs';
import { GrupoEmpresaAgricultor } from '../models/GrupoEmpresaAgricultor';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class GrupoempresaagricultorService {
  private url=`${base_url}/grupoEmpresaAgricultores`
  private listaCambio = new Subject<GrupoEmpresaAgricultor[]>()
  constructor(private http:HttpClient) { }
  list() {
    return this.http.get<GrupoEmpresaAgricultor[]>(this.url).pipe(
      map((grupo: GrupoEmpresaAgricultor[]) => grupo.sort((a, b) => a.idGrupoEmpresaAgricultor - b.idGrupoEmpresaAgricultor)) 
    );
  }
  
  insert(grupo:GrupoEmpresaAgricultor){
    return this.http.post(this.url, grupo)
  }

  setList(listaCambio: GrupoEmpresaAgricultor[]){
    this.listaCambio.next(listaCambio)
  }
  getList(){
    return this.listaCambio.asObservable()
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number){
    return this.http.get<GrupoEmpresaAgricultor>(`${this.url}/${id}`)
  }
  update(g:GrupoEmpresaAgricultor){
    return this.http.put(this.url, g)
  }

}
