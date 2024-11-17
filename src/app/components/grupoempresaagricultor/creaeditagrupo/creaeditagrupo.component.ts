import { CommonModule } from '@angular/common';
import { Component, model, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GrupoEmpresaAgricultor } from '../../../models/GrupoEmpresaAgricultor';
import { Empresa } from '../../../models/Empresa';
import { Agricultor } from '../../../models/Agricultor';
import { GrupoempresaagricultorService } from '../../../services/grupoempresaagricultor.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { EmpresaService } from '../../../services/empresa.service';
import { AgricultorService } from '../../../services/agricultor.service';

@Component({
  selector: 'app-creaeditagrupo',
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
    MatDatepickerModule,
    RouterLink
  ],
  templateUrl: './creaeditagrupo.component.html',
  styleUrl: './creaeditagrupo.component.css'
})
export class CreaeditagrupoComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  grupo: GrupoEmpresaAgricultor = new GrupoEmpresaAgricultor();
  id: number = 0;
  edicion: boolean = false;
  listaEmpresas: Empresa[] = [];
  listaAgricultores: Agricultor[] = [];
  readonly checked = model(false);

  listaEstadoMiembro:{value:string, viewValue:string}[]=[
    {value:'Activo',viewValue:'Activo'},
    {value:'Inactivo',viewValue:'Inactivo'},
    {value:'Proceso de Ingreso',viewValue:'Proceso de Ingreso'},
  ]

  listaRolMiembro:{value:string, viewValue:string}[]=[
    {value:'Director',viewValue:'Director'},
    {value:'Subdirector',viewValue:'Subdirector'},
    {value:'Secretario',viewValue:'Secretario'},
    {value:'Tesorero',viewValue:'Tesorero'},
  ]

  today: Date = new Date();
myFilter = (d: Date | null): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Ajusta la hora a las 00:00 para la comparación
  return d ? d > today : false;
};

  constructor(
    private gS: GrupoempresaagricultorService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private eS: EmpresaService,
    private aS:AgricultorService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hidGrupoEmpresaAgricultor: [''],
      hfechaUnion: ['', Validators.required],
      hestadoMiembro: ['', Validators.required],
      hrolMiembro: ['', Validators.required],
      hobservaciones: ['', Validators.required],
      hempresa: ['', Validators.required],
      hagricultor: ['', Validators.required]
    });

    this.eS.list().subscribe((data) => {
      this.listaEmpresas = data;
    });
    this.aS.list().subscribe((data) => {
      this.listaAgricultores = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.grupo.idGrupoEmpresaAgricultor = this.form.value.hidGrupoEmpresaAgricultor;
      this.grupo.fechaUnion = this.form.value.hfechaUnion;
      this.grupo.estadoMiembro = this.form.value.hestadoMiembro;
      this.grupo.rolMiembro = this.form.value.hrolMiembro;
      this.grupo.observaciones = this.form.value.hobservaciones;
      this.grupo.empresa.idEmpresa = this.form.value.hempresa;
      this.grupo.agricultor.idAgricultor = this.form.value.hagricultor;

      if (this.edicion) {
        this.gS.update(this.grupo).subscribe(() => {
          this.gS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.idGrupoEmpresaAgricultor - b.idGrupoEmpresaAgricultor);
            this.gS.setList(sortedData);
          });
        });
      } else {
        this.gS.insert(this.grupo).subscribe(() => {
          this.gS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.idGrupoEmpresaAgricultor - b.idGrupoEmpresaAgricultor);
            this.gS.setList(sortedData);
          });
        });
      }

      this.router.navigate(['grupoempresa']);
    }
  }

  init(): void {
    if (this.edicion) {
      this.gS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hidGrupoEmpresaAgricultor: new FormControl(data.idGrupoEmpresaAgricultor),
          hfechaUnion: new FormControl(data.fechaUnion),
          hestadoMiembro: new FormControl(data.estadoMiembro),
          hrolMiembro: new FormControl(data.rolMiembro),
          hobservaciones: new FormControl(data.observaciones),
          hempresa: new FormControl(data.empresa.idEmpresa),
          hagricultor: new FormControl(data.agricultor.idAgricultor),
        });
      });
    }
  }

}
