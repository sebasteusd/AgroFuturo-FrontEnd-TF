import { Agricultor } from "./Agricultor";

export class GrupoAgricultor {
  idGrupo: number = 0;
  nombreGrupo: string = "";
  descripcionGrupo: string = "";
  fechaCreacion: Date = new Date();
  estadoGrupo: string = "";
  maxMiembros: number = 0;
  agricultor:Agricultor=new Agricultor();
}
