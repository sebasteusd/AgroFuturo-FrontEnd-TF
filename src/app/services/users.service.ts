import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Subject } from 'rxjs';
import { Users } from '../models/Users';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url=`${base_url}/usuarios`
  private listaCambio = new Subject<Users[]>()
  
  constructor(private http:HttpClient) { }
  
  list() {
    return this.http.get<Users[]>(this.url).pipe(
      map((users: Users[]) => users.sort((a, b) => a.idUsuario - b.idUsuario)) 
    );
  }
  
  insert(user:Users){
    return this.http.post(this.url, user)
  }

  setList(listaCambio: Users[]){
    this.listaCambio.next(listaCambio)
  }
  getList(){
    return this.listaCambio.asObservable()
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number){
    return this.http.get<Users>(`${this.url}/${id}`)
  }
  update(u:Users){
    return this.http.put(this.url, u)
  }
}
