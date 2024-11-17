import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarempresaComponent } from './listarempresa/listarempresa.component';

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [ListarempresaComponent,RouterOutlet],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.css'
})
export class EmpresaComponent {
  constructor(public route:ActivatedRoute){}

}
