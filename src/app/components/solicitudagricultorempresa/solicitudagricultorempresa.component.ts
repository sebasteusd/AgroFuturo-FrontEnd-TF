import { Component } from '@angular/core';
import { ListarsolicitudComponent } from './listarsolicitud/listarsolicitud.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-solicitudagricultorempresa',
  standalone: true,
  imports: [ListarsolicitudComponent,RouterOutlet],
  templateUrl: './solicitudagricultorempresa.component.html',
  styleUrl: './solicitudagricultorempresa.component.css'
})
export class SolicitudagricultorempresaComponent {
  constructor(public route:ActivatedRoute){}
}
