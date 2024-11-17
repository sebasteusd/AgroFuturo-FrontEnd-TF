import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Agricultor } from '../../../models/Agricultor';
import { UsersService } from '../../../services/users.service';
import { AgricultorService } from '../../../services/agricultor.service';
import { Users } from '../../../models/Users';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-creaeditaagricultor',
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
  templateUrl: './creaeditaagricultor.component.html',
  styleUrls: ['./creaeditaagricultor.component.css']
})
export class CreaeditaagricultorComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  agricultor: Agricultor = new Agricultor();
  id: number = 0;
  edicion: boolean = false;
  listaUsuarios: Users[] = [];
  listaTipos:{value:string, viewValue:string}[]=[
    {value:'Comercial',viewValue:'Comercial'},
    {value:'Organico',viewValue:'Organico'},
  ]
  constructor(
    private aS: AgricultorService, 
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
      hidAgricultor: [''],
      hnombreAgricultor: ['', Validators.required],
      hcorreoAgricultor: ['', Validators.required],
      htelefonoAgricultor: ['', Validators.required],
      hubicacionAgricultor: ['', Validators.required],
      htipo: ['', Validators.required],
      husuario: ['', Validators.required]
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.agricultor.idAgricultor = this.form.value.hidAgricultor;
      this.agricultor.nombreAgricultor = this.form.value.hnombreAgricultor;
      this.agricultor.correoAgricultor = this.form.value.hcorreoAgricultor;
      this.agricultor.telefonoAgricultor = this.form.value.htelefonoAgricultor;
      this.agricultor.ubicacionAgricultor = this.form.value.hubicacionAgricultor;
      this.agricultor.tipoProductoAgricultor = this.form.value.htipo;
      this.agricultor.usuario.idUsuario = this.form.value.husuario;

      if (this.edicion) {
        this.aS.update(this.agricultor).subscribe(() => {
          this.aS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.idAgricultor - b.idAgricultor);
            this.aS.setList(sortedData);
          });
        });
      } else {
        this.aS.insert(this.agricultor).subscribe(() => {
          this.aS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.idAgricultor - b.idAgricultor);
            this.aS.setList(sortedData);
          });
        });
      }

      this.router.navigate(['agricultor']);
    }
  }

  init(): void {
    if (this.edicion) {
      this.aS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hidAgricultor: new FormControl(data.idAgricultor),
          hnombreAgricultor: new FormControl(data.nombreAgricultor),
          hcorreoAgricultor: new FormControl(data.correoAgricultor),
          htelefonoAgricultor: new FormControl(data.telefonoAgricultor),
          hubicacionAgricultor: new FormControl(data.ubicacionAgricultor),
          htipo: new FormControl(data.tipoProductoAgricultor),
          husuario: new FormControl(data.usuario.idUsuario),
        });
      });
    }
  }
}