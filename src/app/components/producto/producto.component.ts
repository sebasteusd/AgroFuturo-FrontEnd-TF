import { Component } from '@angular/core';
import { ListarproductoComponent } from "./listarproducto/listarproducto.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [ListarproductoComponent, RouterOutlet],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
    constructor(public route:ActivatedRoute){}
  }
