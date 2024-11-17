import { Agricultor } from "./Agricultor";

export class Producto{
    idProducto:number=0;
    nombreProducto:string="";
    descripcionProducto:string="";
    precioProducto:number=0;
    agricultor:Agricultor=new Agricultor();
}