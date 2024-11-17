import { Component, OnInit } from '@angular/core';
import { AgricultorService } from '../services/agricultor.service';
import { ProductoService } from '../services/producto.service';
import { Agricultor } from '../models/Agricultor';
import { Producto } from '../models/Producto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  agricultores: Agricultor[] = [];
  productos: Producto[] = [];
  reporteData: any[] = [];

  constructor(
    private agricultorService: AgricultorService,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.agricultorService.list().subscribe(agricultores => {
      this.agricultores = agricultores;
      this.productoService.list().subscribe(productos => {
        this.productos = productos;
        this.generateReport();
      });
    });
  }

  generateReport(): void {
    const reportMap = new Map<number, number>();

    this.productos.forEach(producto => {
      const agricultorId = producto.agricultor.idAgricultor;
      if (reportMap.has(agricultorId)) {
        reportMap.set(agricultorId, reportMap.get(agricultorId)! + 1);
      } else {
        reportMap.set(agricultorId, 1);
      }
    });

    this.reporteData = Array.from(reportMap, ([idAgricultor, cantidadProductos]) => {
      const agricultor = this.agricultores.find(a => a.idAgricultor === idAgricultor);
      return { nombre: agricultor?.nombreAgricultor, cantidadProductos };
    }).sort((a, b) => b.cantidadProductos - a.cantidadProductos);
  }
}