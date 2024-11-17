import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { CreaeditagrupoComponent } from '../components/grupoempresaagricultor/creaeditagrupo/creaeditagrupo.component';

@Component({
  selector: 'app-empresa-grupos',
  standalone: true,
  imports: [CreaeditagrupoComponent, RouterOutlet],
  templateUrl: './empresa-grupos.component.html',
  styleUrls: ['./empresa-grupos.component.css']
})
export class EmpresaGruposComponent {
}