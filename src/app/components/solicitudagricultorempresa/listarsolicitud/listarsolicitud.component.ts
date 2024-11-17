import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { SolicitudAgricultorEmpresa } from '../../../models/SolicitudAgricultorEmpresa';
import { SolicitudagricultorempresaService } from '../../../services/solicitudagricultorempresa.service';

@Component({
  selector: 'app-listarsolicitud',
  standalone: true,
  imports: [
    MatTableModule,
    RouterModule,
    MatButtonModule,
    MatIcon,
    MatPaginatorModule
  ],
  templateUrl: './listarsolicitud.component.html',
  styleUrl: './listarsolicitud.component.css'
})
export class ListarsolicitudComponent implements OnInit {
  dataSource:MatTableDataSource<SolicitudAgricultorEmpresa>=new MatTableDataSource()
  @ViewChild(MatPaginator) Paginator!: MatPaginator;

  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6','c7','accion01']
  totalRegistros: number = 0;

  constructor(private sS: SolicitudagricultorempresaService){}
  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
        this.dataSource=new MatTableDataSource(data);
        this.totalRegistros = data.length;
        this.dataSource.paginator = this.Paginator;
    });
    this.sS.getList().subscribe((data) => {
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.Paginator;
      this.totalRegistros = data.length; // Actualizar el total de registros aquí
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.Paginator;
  }
  eliminar(id:number){
    this.sS.delete(id).subscribe((data) => {
      this.sS.list().subscribe((data) => {
        this.sS.setList(data)
      });
    });
  }

}
