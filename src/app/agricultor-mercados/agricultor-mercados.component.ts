import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Producto } from '../models/Producto';
import { Agricultor } from '../models/Agricultor';
import { ProductoService } from '../services/producto.service';
import { AgricultorService } from '../services/agricultor.service';


@Component({
  selector: 'app-agricultor-mercados',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule, 
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './agricultor-mercados.component.html',
  styleUrl: './agricultor-mercados.component.css'
})
export class AgricultorMercadosComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  producto: Producto = new Producto();
  id: number = 0;
  edicion: boolean = false;
  listaAgricultores: Agricultor[] = [];

  constructor(
    private pS: ProductoService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private aS: AgricultorService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hidProducto: [''],
      hnombreProducto: ['', Validators.required],
      hdescripcionProducto: ['', Validators.required],
      hprecioProducto: ['', Validators.required],
      hagricultor: ['', Validators.required]
    });

    this.aS.list().subscribe((data) => {
      this.listaAgricultores = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.producto.idProducto = this.form.value.hidProducto;
      this.producto.nombreProducto = this.form.value.hnombreProducto;
      this.producto.descripcionProducto = this.form.value.hdescripcionProducto;
      this.producto.precioProducto = this.form.value.hprecioProducto;
      this.producto.agricultor.idAgricultor = this.form.value.hagricultor;

      if (this.edicion) {
        this.pS.update(this.producto).subscribe(() => {
          this.pS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.idProducto - b.idProducto);
            this.pS.setList(sortedData);
          });
        });
      } else {
        this.pS.insert(this.producto).subscribe(() => {
          this.pS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.idProducto - b.idProducto);
            this.pS.setList(sortedData);
          });
        });
      }

    }
  }

  init(): void {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hidProducto: new FormControl(data.idProducto),
          hnombreProducto: new FormControl(data.nombreProducto),
          hdescripcionProducto: new FormControl(data.descripcionProducto),
          hprecioProducto: new FormControl(data.precioProducto),
          hagricultor: new FormControl(data.agricultor.idAgricultor),
        });
      });
    }
  }
}
