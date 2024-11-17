import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Users } from '../../../models/Users';
import { UsersService } from '../../../services/users.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarusers',
  standalone: true,
  imports: [
    MatTableModule,
     MatIconModule, 
     RouterModule,
     MatPaginatorModule
    ],
  templateUrl: './listarusers.component.html',
  styleUrl: './listarusers.component.css'
})
export class ListarusersComponent implements OnInit{
  dataSource:MatTableDataSource<Users>=new MatTableDataSource()
  @ViewChild(MatPaginator) Paginator!: MatPaginator;

  displayedColumns:string[]=['c1','c2','c5','c6','c7','c8','c9','c10','c11','accion01']
  totalRegistros: number = 0;

  constructor(private uS: UsersService){}
  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource=new MatTableDataSource(data);
      this.totalRegistros = data.length;
      this.dataSource.paginator = this.Paginator;
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.Paginator;
      this.totalRegistros = data.length;
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.Paginator;
  }
  eliminar(id:number){
    this.uS.delete(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data)
      });
    });
  }
}