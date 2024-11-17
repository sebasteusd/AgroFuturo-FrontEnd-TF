import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-integrantes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './integrantes.component.html',
  styleUrls: ['./integrantes.component.css']
})
export class IntegrantesComponent {
  integrantes = [
    { nombre: 'Valdivia Colque, Diego Sebastian', rol: 'Desarrollador Frontend, Gestor del Proyecto' },
    { nombre: 'Flores Casas, Christian Alexander', rol: 'Desarrollador Backend' },
    { nombre: 'Cutimbo Lopez Luza, Jose Luis', rol: 'Diseñador UI/UX' }
  ];
}