import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GrupoEmpresaAgricultor } from '../models/GrupoEmpresaAgricultor';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { GrupoempresaagricultorService } from '../services/grupoempresaagricultor.service';

@Component({
  selector: 'app-reporte-grupo',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './reporte-grupo.component.html',
  styleUrls: ['./reporte-grupo.component.css']
})
export class ReporteGrupoComponent implements OnInit {
  grupos: GrupoEmpresaAgricultor[] = [];
  form: FormGroup;
  selectedGroup: GrupoEmpresaAgricultor | null = null;
  totalAgricultores: number = 0;

  constructor(
    private grupoService: GrupoempresaagricultorService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      grupo: ['']
    });
  }

  ngOnInit(): void {
    this.grupoService.list().subscribe(grupos => {
      this.grupos = grupos;
    });
  }

  getAgricultores(): void {
    const grupoId = this.form.value.grupo;
    this.selectedGroup = this.grupos.find(g => g.idGrupoEmpresaAgricultor === grupoId) || null;
    if (this.selectedGroup) {
      this.totalAgricultores = this.grupos.filter(g => g.idGrupoEmpresaAgricultor === grupoId).length;
    } else {
      this.totalAgricultores = 0;
    }
  }
}