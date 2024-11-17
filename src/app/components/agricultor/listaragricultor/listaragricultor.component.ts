import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Agricultor } from '../../../models/Agricultor';
import { AgricultorService } from '../../../services/agricultor.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listaragricultor',
  standalone: true,
  imports: [
    MatTableModule,
     MatIconModule,
      RouterModule,
      MatPaginatorModule
    ],
  templateUrl: './listaragricultor.component.html',
  styleUrl: './listaragricultor.component.css'
})
export class ListaragricultorComponent {
  dataSource:MatTableDataSource<Agricultor>=new MatTableDataSource()
  @ViewChild(MatPaginator) Paginator!: MatPaginator;
  displayedColumns:string[]=['c1','c2','c3','c4', 'c5', 'c6', 'accion01']
  totalRegistros: number = 0;

  constructor(private aS: AgricultorService){}
  ngOnInit(): void {
    this.aS.list().subscribe((data) => {
        this.dataSource=new MatTableDataSource(data);
        this.totalRegistros = data.length;
        this.dataSource.paginator = this.Paginator;
    });
    this.aS.getList().subscribe((data) => {
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.Paginator;
      this.totalRegistros = data.length; // Actualizar el total de registros aquí
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.Paginator;
  }
  eliminar(id:number){
    this.aS.delete(id).subscribe((data) => {
      this.aS.list().subscribe((data) => {
        this.aS.setList(data)
      });
    });
  }
}
