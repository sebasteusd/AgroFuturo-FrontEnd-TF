import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListaragricultorComponent } from '../components/agricultor/listaragricultor/listaragricultor.component';

@Component({
  selector: 'app-empresa-agricultores',
  standalone: true,
  imports: [ListaragricultorComponent, RouterOutlet],
  templateUrl: './empresa-agricultores.component.html',
  styleUrls: ['./empresa-agricultores.component.css']
})
export class EmpresaAgricultoresComponent {
  constructor(public route: ActivatedRoute) {}
}