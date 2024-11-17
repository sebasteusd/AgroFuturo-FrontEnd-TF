import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { GrupoEmpresaAgricultor } from '../../../models/GrupoEmpresaAgricultor';
import { GrupoempresaagricultorService } from '../../../services/grupoempresaagricultor.service';

@Component({
  selector: 'app-listargrupo',
  standalone: true,
  imports: [
    MatTableModule,
    RouterModule,
    MatButtonModule,
    MatIcon,
    MatPaginatorModule
  ],
  templateUrl: './listargrupo.component.html',
  styleUrl: './listargrupo.component.css'
})
export class ListargrupoComponent implements OnInit {
  dataSource:MatTableDataSource<GrupoEmpresaAgricultor>=new MatTableDataSource()
  @ViewChild(MatPaginator) Paginator!: MatPaginator;

  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6','c7','accion01']
  totalRegistros: number = 0;

  constructor(private gS: GrupoempresaagricultorService){}
  ngOnInit(): void {
    this.gS.list().subscribe((data) => {
        this.dataSource=new MatTableDataSource(data);
        this.totalRegistros = data.length;
        this.dataSource.paginator = this.Paginator;
    });
    this.gS.getList().subscribe((data) => {
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.Paginator;
      this.totalRegistros = data.length; // Actualizar el total de registros aquí
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.Paginator;
  }
  eliminar(id:number){
    this.gS.delete(id).subscribe((data) => {
      this.gS.list().subscribe((data) => {
        this.gS.setList(data)
      });
    });
  }


}
