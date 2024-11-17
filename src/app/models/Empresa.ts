import { Users } from "./Users";

export class Empresa{
    idEmpresa: number = 0;
    nombreEmpresa: string = "";
    ubicacionEmpresa: string = "";
    telefonoEmpresa: string = "";
    correoEmpresa: string = "";
    tipoIndustria: string = "";
    user: Users = new Users();
}