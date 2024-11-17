import { Agricultor } from "./Agricultor"
import { Empresa } from "./Empresa"

export class GrupoEmpresaAgricultor{
    idGrupoEmpresaAgricultor:number=0
    fechaUnion:Date=new Date()
    estadoMiembro:string=""
    rolMiembro:string=""
    observaciones:string=""
    empresa:Empresa=new Empresa()
    agricultor:Agricultor=new Agricultor()
}