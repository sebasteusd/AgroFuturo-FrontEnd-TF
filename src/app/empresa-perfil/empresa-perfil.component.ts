import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Empresa } from '../models/Empresa';
import { Users } from '../models/Users';
import { EmpresaService } from '../services/empresa.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-empresa-perfil',
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
  templateUrl: './empresa-perfil.component.html',
  styleUrls: ['./empresa-perfil.component.css']
})
export class EmpresaPerfilComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  empresa: Empresa = new Empresa();
  id: number = 0;
  edicion: boolean = false;
  listaUsuarios: Users[] = [];
  listaTipos:{value:string, viewValue:string}[]=[
    {value:'Jardinería',viewValue:'Jardinería'},
    {value:'Panadería',viewValue:'Panadería'},
    {value:'Artesanías ',viewValue:'Artesanías '},
    {value:'Servicios de Lavandería',viewValue:'Servicios de Lavandería'},
    {value:'Capacitaciones',viewValue:'Capacitaciones'},
    {value:'Taller de Reparaciones',viewValue:'Taller de Reparaciones'},
  ]

  constructor(
    private eS: EmpresaService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsersService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hidEmpresa: [''],
      hnombreEmpresa: ['', Validators.required],
      hcorreoEmpresa: ['', Validators.required],
      htelefonoEmpresa: ['', Validators.required],
      hubicacionEmpresa: ['', Validators.required],
      htipoIndustria: ['', Validators.required],
      husuario: ['', Validators.required]
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.empresa.idEmpresa = this.form.value.hidEmpresa;
      this.empresa.nombreEmpresa = this.form.value.hnombreEmpresa;
      this.empresa.correoEmpresa = this.form.value.hcorreoEmpresa;
      this.empresa.telefonoEmpresa = this.form.value.htelefonoEmpresa;
      this.empresa.ubicacionEmpresa = this.form.value.hubicacionEmpresa;
      this.empresa.tipoIndustria = this.form.value.htipoIndustria;
      this.empresa.user.idUsuario = this.form.value.husuario;

      if (this.edicion) {
        this.eS.update(this.empresa).subscribe(() => {
          this.eS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.idEmpresa - b.idEmpresa);
            this.eS.setList(sortedData);
          });
        });
      } else {
        this.eS.insert(this.empresa).subscribe(() => {
          this.eS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.idEmpresa - b.idEmpresa);
            this.eS.setList(sortedData);
          });
        });
      }

      this.router.navigate(['empresa']);
    }
  }

  init(): void {
    if (this.edicion) {
      this.eS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hidEmpresa: new FormControl(data.idEmpresa),
          hnombreEmpresa: new FormControl(data.nombreEmpresa),
          hcorreoEmpresa: new FormControl(data.correoEmpresa),
          htelefonoEmpresa: new FormControl(data.telefonoEmpresa),
          hubicacionEmpresa: new FormControl(data.ubicacionEmpresa),
          htipoIndustria: new FormControl(data.tipoIndustria),
          husuario: new FormControl(data.user.idUsuario),
        });
      });
    }
  }

  logout(): void {
    this.router.navigate(['/home']);
  }
}