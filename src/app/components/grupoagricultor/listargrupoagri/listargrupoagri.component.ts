import { OriginConnectionPosition } from '@angular/cdk/overlay';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { GrupoAgricultor } from '../../../models/GrupoAgricultor';
import { GrupoagricultorService } from '../../../services/grupoagricultor.service';

@Component({
  selector: 'app-listargrupoagri',
  standalone: true,
  imports: [
    MatTableModule,
    RouterModule,
    MatButtonModule,
    MatIcon,
    MatPaginatorModule
  ],
  templateUrl: './listargrupoagri.component.html',
  styleUrl: './listargrupoagri.component.css'
})
export class ListargrupoagriComponent implements OnInit {
  dataSource:MatTableDataSource<GrupoAgricultor>=new MatTableDataSource()
  @ViewChild(MatPaginator) Paginator!: MatPaginator;

  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6','c7','accion01']
  totalRegistros: number = 0;

  constructor(private gS: GrupoagricultorService){}
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
