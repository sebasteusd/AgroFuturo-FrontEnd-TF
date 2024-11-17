import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Users } from '../../../models/Users';
import { UsersService } from '../../../services/users.service';
import { RoleService } from '../../../services/role.service';
import { Role } from '../../../models/Role';

@Component({
  selector: 'app-creaeditarole',
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
  templateUrl: './creaeditarole.component.html',
  styleUrl: './creaeditarole.component.css'
})
export class CreaeditaroleComponent implements OnInit {
  form:FormGroup=new FormGroup({});
  rol:Role=new Role()
  id:number=0
  edicion:boolean=false

  listaRoles:{value:string, viewValue:string}[]=[
    {value:'ADMINISTRADOR',viewValue:'ADMINISTRADOR'},
    {value:'CLIENTE',viewValue:'CLIENTE'},
  ]
  listaUsuarios: Users[] = []
  
  constructor(
    private rS: RoleService, 
    private formBuilder:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private uS: UsersService,
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id = data['id'];
      this.edicion = data['id']!=null
      this.init()
    })
    
      this.form = this.formBuilder.group({
        hcodigo:[''],
        hrol:['', Validators.required],
        huser:['', Validators.required],
      })
      this.uS.list().subscribe((data) => {
        this.listaUsuarios = data;
      });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.rol.id = this.form.value.hcodigo;
      this.rol.rol = this.form.value.hrol;
      this.rol.user.idUsuario = this.form.value.huser;

      if (this.edicion) {
        this.rS.update(this.rol).subscribe(() => {
          this.rS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.id- b.id);
            this.rS.setList(sortedData);
          });
        });
      } else {
        this.rS.insert(this.rol).subscribe(() => {
          this.rS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.id - b.id);
            this.rS.setList(sortedData);
          });
        });
      }

      this.router.navigate(['roles']);
    }
  }
  init(){
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.id),
          hrol: new FormControl(data.rol),
          huser: new FormControl(data.user.idUsuario),
        });
      });
    }
  }
}
