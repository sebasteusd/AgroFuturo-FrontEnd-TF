import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/Users';
import { map, Subject } from 'rxjs';
import { Agricultor } from '../models/Agricultor';
import { Role } from '../models/Role';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private url=`${base_url}/roles`
  private listaCambio = new Subject<Role[]>()
  constructor(private http:HttpClient) { }
  list() {
    return this.http.get<Role[]>(this.url).pipe(
      map((roles: Role[]) => roles.sort((a, b) => a.id- b.id)) 
    );
  }
  
  insert(roles:Role){
    return this.http.post(this.url, roles)
  }

  setList(listaCambio: Role[]){
    this.listaCambio.next(listaCambio)
  }
  getList(){
    return this.listaCambio.asObservable()
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number){
    return this.http.get<Role>(`${this.url}/${id}`)
  }
  update(r:Role){
    return this.http.put(this.url, r)
  }
}

