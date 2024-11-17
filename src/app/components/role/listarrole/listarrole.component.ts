import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Role } from '../../../models/Role';
import { RoleService } from '../../../services/role.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarrole',
  standalone: true,
  imports: [
    MatTableModule,
     MatIconModule, 
     RouterModule,
     MatPaginatorModule,
     MatIcon
  ],
  templateUrl: './listarrole.component.html',
  styleUrl: './listarrole.component.css'
})
export class ListarroleComponent implements OnInit {
  dataSource:MatTableDataSource<Role>=new MatTableDataSource()
  @ViewChild(MatPaginator) Paginator!: MatPaginator;

  displayedColumns:string[]=['c1','c2','c3','accion01']
  constructor(private rS: RoleService){}
  totalRegistros: number = 0;

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      data.sort((a, b) => a.id - b.id);
      this.dataSource = new MatTableDataSource(data);
      this.totalRegistros = data.length;
      this.dataSource.paginator = this.Paginator;
    });
    
    this.rS.getList().subscribe(data => {
      data.sort((a, b) => a.id - b.id);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.Paginator;
      this.totalRegistros = data.length; // Actualizar el total de registros aquí
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.Paginator;
  }
  eliminar(id:number){
    this.rS.delete(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data)
      });
    });
  }
}
