import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';
import { Producto } from '../models/Producto';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url=`${base_url}/productos`
  private listaCambio = new Subject<Producto[]>()
  constructor(private http:HttpClient) { }
  list() {
    return this.http.get<Producto[]>(this.url).pipe(
      map((productos: Producto[]) => productos.sort((a, b) => a.idProducto- b.idProducto)) 
    );
  }
  
  insert(productos:Producto){
    return this.http.post(this.url, productos)
  }

  setList(listaCambio: Producto[]){
    this.listaCambio.next(listaCambio)
  }
  getList(){
    return this.listaCambio.asObservable()
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number){
    return this.http.get<Producto>(`${this.url}/${id}`)
  }
  update(p:Producto){
    return this.http.put(this.url, p)
  }
}
