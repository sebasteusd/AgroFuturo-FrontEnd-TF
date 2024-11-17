import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AgricultorService } from '../services/agricultor.service';
import { ProductoService } from '../services/producto.service';
import { Agricultor } from '../models/Agricultor';
import { Producto } from '../models/Producto';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-reporte-productos-agricultor',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
  ],
  templateUrl: './reporte-productos-agricultor.component.html',
  styleUrls: ['./reporte-productos-agricultor.component.css']
})
export class ReporteProductosAgricultorComponent implements OnInit {
  agricultores: Agricultor[] = [];
  productos: Producto[] = [];
  form: FormGroup;
  selectedAgricultor: Agricultor | null = null;
  productosAgricultor: Producto[] = [];
  displayedColumns: string[] = ['nombreProducto', 'descripcionProducto', 'precioProducto'];

  constructor(
    private agricultorService: AgricultorService,
    private productoService: ProductoService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      agricultor: ['']
    });
  }

  ngOnInit(): void {
    this.agricultorService.list().subscribe(agricultores => {
      this.agricultores = agricultores;
    });
    this.productoService.list().subscribe(productos => {
      this.productos = productos;
    });
  }

  getProductos(): void {
    const agricultorId = this.form.value.agricultor;
    this.selectedAgricultor = this.agricultores.find(a => a.idAgricultor === agricultorId) || null;
    if (this.selectedAgricultor) {
      this.productosAgricultor = this.productos.filter(p => p.agricultor.idAgricultor === agricultorId);
    } else {
      this.productosAgricultor = [];
    }
  }
}