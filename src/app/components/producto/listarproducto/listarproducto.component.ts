import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Producto } from '../../../models/Producto';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-listarproducto',
  standalone: true,
  imports: [
    MatTableModule,
    RouterModule,
    MatButtonModule,
    MatIcon,
    MatPaginatorModule
  ],
  templateUrl: './listarproducto.component.html',
  styleUrl: './listarproducto.component.css'
})
export class ListarproductoComponent implements OnInit {
  dataSource:MatTableDataSource<Producto>=new MatTableDataSource()
  @ViewChild(MatPaginator) Paginator!: MatPaginator;

  displayedColumns:string[]=['c1','c2','c3','c4','c5','accion01']
  totalRegistros: number = 0;

  constructor(private pS: ProductoService){}
  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
        this.dataSource=new MatTableDataSource(data);
        this.totalRegistros = data.length;
        this.dataSource.paginator = this.Paginator;
    });
    this.pS.getList().subscribe((data) => {
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.Paginator;
      this.totalRegistros = data.length; // Actualizar el total de registros aquí
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.Paginator;
  }
  eliminar(id:number){
    this.pS.delete(id).subscribe((data) => {
      this.pS.list().subscribe((data) => {
        this.pS.setList(data)
      });
    });
  }

}
