import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmpresaService } from '../services/empresa.service';
import { CompraService } from '../services/compra.service';
import { Empresa } from '../models/Empresa';
import { Compra } from '../models/Compra';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-reporte-compras-empresa',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    ReactiveFormsModule,
  ],
  templateUrl: './reporte-compras-empresa.component.html',
  styleUrls: ['./reporte-compras-empresa.component.css']
})
export class ReporteComprasEmpresaComponent implements OnInit {
  empresas: Empresa[] = [];
  compras: Compra[] = [];
  form: FormGroup;
  selectedEmpresa: Empresa | null = null;
  comprasEmpresa: Compra[] = [];
  displayedColumns: string[] = ['fechaCompra', 'cantidad', 'total'];

  constructor(
    private empresaService: EmpresaService,
    private compraService: CompraService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      empresa: ['']
    });
  }

  ngOnInit(): void {
    this.empresaService.list().subscribe(empresas => {
      this.empresas = empresas;
    });
    this.compraService.list().subscribe(compras => {
      this.compras = compras;
    });
  }

  getCompras(): void {
    const empresaId = this.form.value.empresa;
    this.selectedEmpresa = this.empresas.find(e => e.idEmpresa === empresaId) || null;
    if (this.selectedEmpresa) {
      this.comprasEmpresa = this.compras.filter(c => c.user.idUsuario === this.selectedEmpresa?.user.idUsuario);
    } else {
      this.comprasEmpresa = [];
    }
  }
}