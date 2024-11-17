import { Producto } from "./Producto"
import { Users } from "./Users"

export class Compra{
    idCompra: number=0
    cantidad:number=0
    fechaCompra:Date=new Date()
    total:number=0
    user:Users=new Users();
    producto:Producto=new Producto()
}