import { CommonModule } from '@angular/common';
import { Component, model, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Compra } from '../../../models/Compra';
import { Users } from '../../../models/Users';
import { Producto } from '../../../models/Producto';
import { CompraService } from '../../../services/compra.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { ProductoService } from '../../../services/producto.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-creaeditacompra',
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
  templateUrl: './creaeditacompra.component.html',
  styleUrl: './creaeditacompra.component.css'
})
export class CreaeditacompraComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  compra: Compra = new Compra();
  id: number = 0;
  edicion: boolean = false;
  listaUsuarios: Users[] = [];
  listaProductos: Producto[] = [];
  readonly checked = model(false);

  today: Date = new Date();
myFilter = (d: Date | null): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Ajusta la hora a las 00:00 para la comparación
  return d ? d > today : false;
};

  constructor(
    private cS: CompraService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsersService,
    private pS:ProductoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hidCompra: [''],
      hcantidad: ['', Validators.required],
      hfechaCompra: ['', Validators.required],
      htotal: ['', Validators.required],
      husuario: ['', Validators.required],
      hproducto: ['', Validators.required]
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
    this.pS.list().subscribe((data) => {
      this.listaProductos = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.compra.idCompra = this.form.value.hidCompra;
      this.compra.cantidad = this.form.value.hcantidad;
      this.compra.fechaCompra = this.form.value.hfechaCompra;
      this.compra.total = this.form.value.htotal;
      this.compra.user.idUsuario = this.form.value.husuario;
      this.compra.producto.idProducto = this.form.value.hproducto;

      if (this.edicion) {
        this.cS.update(this.compra).subscribe(() => {
          this.cS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.idCompra - b.idCompra);
            this.cS.setList(sortedData);
          });
        });
      } else {
        this.cS.insert(this.compra).subscribe(() => {
          this.cS.list().subscribe(data => {
            const sortedData = data.sort((a, b) => a.idCompra - b.idCompra);
            this.cS.setList(sortedData);
          });
        });
      }

      this.router.navigate(['compras']);
    }
  }

  init(): void {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hidCompra: new FormControl(data.idCompra),
          hcantidad: new FormControl(data.cantidad),
          hfechaCompra: new FormControl(data.fechaCompra),
          htotal: new FormControl(data.total),
          husuario: new FormControl(data.user.idUsuario),
          hproducto: new FormControl(data.producto.idProducto),
        });
      });
    }
  }

}
