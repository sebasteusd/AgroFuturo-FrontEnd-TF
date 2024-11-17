import { Agricultor } from "./Agricultor"
import { Empresa } from "./Empresa"

export class SolicitudAgricultorEmpresa{
    idSolicitudAgricultorEmpresa:number=0
    fechaSolicitud:Date=new Date()
    estadoSolicitud:string=""
    fechaRespuesta:Date=new Date()
    comentario:string=""
    empresa:Empresa=new Empresa()
    agricultor:Agricultor=new Agricultor()
}