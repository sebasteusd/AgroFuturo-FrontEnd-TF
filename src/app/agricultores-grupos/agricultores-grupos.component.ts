import { CommonModule } from '@angular/common';
import { Component, model, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { GrupoAgricultor } from '../models/GrupoAgricultor';
import { Agricultor } from '../models/Agricultor';
import { GrupoagricultorService } from '../services/grupoagricultor.service';
import { AgricultorService } from '../services/agricultor.service';

@Component({
  selector: 'app-agricultores-grupos',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule, 
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    MatDatepickerModule
  ],
  templateUrl: './agricultores-grupos.component.html',
  styleUrls: ['./agricultores-grupos.component.css']
})
export class AgricultoresGruposComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  grupoagri: GrupoAgricultor = new GrupoAgricultor();
  id: number = 0;
  edicion: boolean = false;
  listaAgricultores: Agricultor[] = [];
  readonly checked = model(false);
  listaEstados:{value:string, viewValue:string}[]=[
    {value:'Activo',viewValue:'Activo'},
    {value:'Inactivo',viewValue:'Inactivo'},
    {value:'Progreso',viewValue:'Progreso'},
  ]

  today: Date = new Date();
  myFilter = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ajusta la hora a las 00:00 para la comparación
    return d ? d > today : false;
  };

  constructor(
    private gS: GrupoagricultorService, 
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
      hidGrupo: [''],
      hnombreGrupo: ['', Validators.required],
      hdescripcionGrupo: ['', Validators.required],
      hfechaCreacion: ['', Validators.required],
      hestadoGrupo: ['', Validators.required],
      hmaxMiembros: ['', Validators.required],
      hagricultor: ['', Validators.required]
    });

    this.aS.list().subscribe((data) => {
      this.listaAgricultores = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.grupoagri.idGrupo = this.form.value.hidGrupo;
      this.grupoagri.nombreGrupo = this.form.value.hnombreGrupo;
      this.grupoagri.descripcionGrupo = this.form.value.hdescripcionGrupo;
      this.grupoagri.fechaCreacion = this.form.value.hfechaCreacion;
      this.grupoagri.estadoGrupo = this.form.value.hestadoGrupo;
      this.grupoagri.maxMiembros = this.form.value.hmaxMiembros;
      this.grupoagri.agricultor.idAgricultor = this.form.value.hagricultor;

      if (this.edicion) {
        this.gS.update(this.grupoagri).subscribe(() => {
          this.gS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.idGrupo - b.idGrupo);
            this.gS.setList(sortedData);
          });
        });
      } else {
        this.gS.insert(this.grupoagri).subscribe(() => {
          this.gS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.idGrupo - b.idGrupo);
            this.gS.setList(sortedData);
          });
        });
      }
    }
  }

  init(): void {
    if (this.edicion) {
      this.gS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hidGrupo: new FormControl(data.idGrupo),
          hnombreGrupo: new FormControl(data.nombreGrupo),
          hdescripcionGrupo: new FormControl(data.descripcionGrupo),
          hfechaCreacion: new FormControl(data.fechaCreacion),
          hestadoGrupo: new FormControl(data.estadoGrupo),
          hmaxMiembros: new FormControl(data.maxMiembros),
          hagricultor: new FormControl(data.agricultor.idAgricultor),
        });
      });
    }
  }
}