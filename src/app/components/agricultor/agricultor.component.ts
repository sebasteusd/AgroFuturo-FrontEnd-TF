import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListaragricultorComponent } from "./listaragricultor/listaragricultor.component";

@Component({
  selector: 'app-agricultor',
  standalone: true,
  imports: [ListaragricultorComponent, RouterOutlet],
  templateUrl: './agricultor.component.html',
  styleUrl: './agricultor.component.css'
})
export class AgricultorComponent {
  constructor(public route:ActivatedRoute){}
}
