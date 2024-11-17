import { Component } from '@angular/core';
import { ListargrupoComponent } from './listargrupo/listargrupo.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-grupoempresaagricultor',
  standalone: true,
  imports: [ListargrupoComponent,RouterOutlet],
  templateUrl: './grupoempresaagricultor.component.html',
  styleUrl: './grupoempresaagricultor.component.css'
})
export class GrupoempresaagricultorComponent {
  constructor(public route:ActivatedRoute){}
}
