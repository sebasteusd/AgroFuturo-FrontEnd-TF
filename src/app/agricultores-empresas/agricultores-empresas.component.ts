import { CommonModule } from '@angular/common';
import { Component, model, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { SolicitudAgricultorEmpresa } from '../models/SolicitudAgricultorEmpresa';
import { Agricultor } from '../models/Agricultor';
import { Empresa } from '../models/Empresa';
import { SolicitudagricultorempresaService } from '../services/solicitudagricultorempresa.service';
import { AgricultorService } from '../services/agricultor.service';
import { EmpresaService } from '../services/empresa.service';

@Component({
  selector: 'app-agricultores-empresas',
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
  templateUrl: './agricultores-empresas.component.html',
  styleUrls: ['./agricultores-empresas.component.css']
})
export class AgricultoresEmpresasComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  solicitud: SolicitudAgricultorEmpresa = new SolicitudAgricultorEmpresa();
  id: number = 0;
  edicion: boolean = false;
  listaEmpresas: Empresa[] = [];
  listaAgricultores: Agricultor[] = [];
  readonly checked = model(false);

  listaEstadoSolicitud:{value:string, viewValue:string}[]=[
    {value:'Activo',viewValue:'Activo'},
    {value:'Inactivo',viewValue:'Inactivo'},
    {value:'Proceso',viewValue:'Proceso'},
  ]

  today: Date = new Date();
  myFilter = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ajusta la hora a las 00:00 para la comparación
    return d ? d > today : false;
  };

  constructor(
    private sS: SolicitudagricultorempresaService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private eS: EmpresaService,
    private aS: AgricultorService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hidSolicitudAgricultorEmpresa: [''],
      hfechaSolicitud: ['', Validators.required],
      hestadoSolicitud: ['', Validators.required],
      hfechaRespuesta: ['', Validators.required],
      hcomentario: ['', Validators.required],
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
      this.solicitud.idSolicitudAgricultorEmpresa = this.form.value.hidSolicitudAgricultorEmpresa;
      this.solicitud.fechaSolicitud = this.form.value.hfechaSolicitud;
      this.solicitud.estadoSolicitud = this.form.value.hestadoSolicitud;
      this.solicitud.fechaRespuesta = this.form.value.hfechaRespuesta;
      this.solicitud.comentario = this.form.value.hcomentario;
      this.solicitud.empresa.idEmpresa = this.form.value.hempresa;
      this.solicitud.agricultor.idAgricultor = this.form.value.hagricultor;

      if (this.edicion) {
        this.sS.update(this.solicitud).subscribe(() => {
          this.sS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.idSolicitudAgricultorEmpresa - b.idSolicitudAgricultorEmpresa);
            this.sS.setList(sortedData);
          });
        });
      } else {
        this.sS.insert(this.solicitud).subscribe(() => {
          this.sS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.idSolicitudAgricultorEmpresa - b.idSolicitudAgricultorEmpresa);
            this.sS.setList(sortedData);
          });
        });
      }

      this.router.navigate(['solicitudagricultor']);
    }
  }

  init(): void {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hidSolicitudAgricultorEmpresa: new FormControl(data.idSolicitudAgricultorEmpresa),
          hfechaSolicitud: new FormControl(data.fechaSolicitud),
          hestadoSolicitud: new FormControl(data.estadoSolicitud),
          hfechaRespuesta: new FormControl(data.fechaRespuesta),
          hcomentario: new FormControl(data.comentario),
          hempresa: new FormControl(data.empresa.idEmpresa),
          hagricultor: new FormControl(data.agricultor.idAgricultor),
        });
      });
    }
  }
}