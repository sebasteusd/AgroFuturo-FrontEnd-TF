import { Component, OnInit } from '@angular/core';
import { CompraService } from '../services/compra.service';
import { Compra } from '../models/Compra';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-reporte-compras',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule
  ],
  templateUrl: './reporte-compras.component.html',
  styleUrls: ['./reporte-compras.component.css']
})
export class ReporteComprasComponent implements OnInit {
  compras: Compra[] = [];
  totalCompras: number = 0;
  form: FormGroup;

  constructor(
    private compraService: CompraService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      startDate: [''],
      endDate: ['']
    });
  }

  ngOnInit(): void {
    this.compraService.list().subscribe(compras => {
      this.compras = compras;
    });
  }

  getCompras(): void {
    const { startDate, endDate } = this.form.value;
    const start = new Date(startDate);
    const end = new Date(endDate);
    this.totalCompras = 0;

    const filteredCompras = this.compras.filter(compra => {
      const compraDate = new Date(compra.fechaCompra);
      return compraDate >= start && compraDate <= end;
    });

    this.totalCompras = filteredCompras.reduce((total, compra) => total + compra.total, 0);
    this.compras = filteredCompras;
  }
}