import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Empresa } from '../../../models/Empresa';
import { EmpresaService } from '../../../services/empresa.service';

@Component({
  selector: 'app-listarempresa',
  standalone: true,
  imports: [
    MatTableModule,
    RouterModule,
    MatButtonModule,
    MatIcon,
    MatPaginatorModule
  ],
  templateUrl: './listarempresa.component.html',
  styleUrl: './listarempresa.component.css'
})
export class ListarempresaComponent implements OnInit {
  dataSource:MatTableDataSource<Empresa>=new MatTableDataSource()
  @ViewChild(MatPaginator) Paginator!: MatPaginator;

  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6','c7','accion01']
  totalRegistros: number = 0;

  constructor(private eS: EmpresaService){}
  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
        this.dataSource=new MatTableDataSource(data);
        this.totalRegistros = data.length;
        this.dataSource.paginator = this.Paginator;
    });
    this.eS.getList().subscribe((data) => {
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.Paginator;
      this.totalRegistros = data.length; // Actualizar el total de registros aquí
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.Paginator;
  }
  eliminar(id:number){
    this.eS.delete(id).subscribe((data) => {
      this.eS.list().subscribe((data) => {
        this.eS.setList(data)
      });
    });
  }

}
