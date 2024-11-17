import { Component } from '@angular/core';
import { ListarcompraComponent } from './listarcompra/listarcompra.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [ ListarcompraComponent, RouterOutlet],
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.css'
})
export class CompraComponent {
  constructor(public route:ActivatedRoute){}
}
