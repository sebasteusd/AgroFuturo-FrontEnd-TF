import { Component } from '@angular/core';
import { ListargrupoagriComponent } from './listargrupoagri/listargrupoagri.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-grupoagricultor',
  standalone: true,
  imports: [ListargrupoagriComponent,RouterOutlet],
  templateUrl: './grupoagricultor.component.html',
  styleUrl: './grupoagricultor.component.css'
})
export class GrupoagricultorComponent {
  constructor(public route:ActivatedRoute){}
}
