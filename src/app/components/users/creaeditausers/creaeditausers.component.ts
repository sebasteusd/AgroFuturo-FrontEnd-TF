import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Users } from '../../../models/Users';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creaeditausers',
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
  templateUrl: './creaeditausers.component.html',
  styleUrls: ['./creaeditausers.component.css']
})
export class CreaeditausersComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  user: Users = new Users();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private uS: UsersService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hidUsuario: [''],
      husername: ['', Validators.required],
      hpassword: ['', Validators.required],
      hnombreUsuario: ['', Validators.required],
      hcorreoUsuario: ['', Validators.required],
      htelefonoUsuario: ['', Validators.required],
      htipoUsuario: ['', Validators.required]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.user.idUsuario = this.form.value.hidUsuario;
      this.user.username = this.form.value.husername;
      this.user.password = this.form.value.hpassword;
      this.user.nombreUsuario = this.form.value.hnombreUsuario;
      this.user.correoUsuario = this.form.value.hcorreoUsuario;
      this.user.telefonoUsuario = this.form.value.htelefonoUsuario;
      this.user.tipoUsuario = this.form.value.htipoUsuario;

      if (this.edicion) {
        this.uS.update(this.user).subscribe(d => {
          this.uS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.idUsuario - b.idUsuario); 
            this.uS.setList(sortedData); 
          });
        });
      } else {
        this.uS.insert(this.user).subscribe(d => {
          this.uS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.idUsuario - b.idUsuario); 
            this.uS.setList(sortedData); 
          });
        });
      }

      this.router.navigate(['usuarios']);
    }
  }

  init(): void {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hidUsuario: new FormControl(data.idUsuario),
          husername: new FormControl(data.username),
          hpassword: new FormControl(data.password),
          hnombreUsuario: new FormControl(data.nombreUsuario),
          hcorreoUsuario: new FormControl(data.correoUsuario),
          htelefonoUsuario: new FormControl(data.telefonoUsuario),
          htipoUsuario: new FormControl(data.tipoUsuario)
        });
      });
    }
  }
}