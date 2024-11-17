import { Role } from "./Role";

export class Users{
    idUsuario: number = 0;
    username:string = "";
    password:string = "";
    enabled:boolean=true;
    nombreUsuario: string = "";
    correoUsuario: string = "";
    telefonoUsuario: string = "";
    tipoUsuario: string = "";
    fechaCreacion: Date = new Date(Date.now());
    roles: Role[]=new Array<Role>();
}