import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarproductoComponent } from '../components/producto/listarproducto/listarproducto.component';
import { CreaeditacompraComponent } from '../components/compra/creaeditacompra/creaeditacompra.component';

@Component({
  selector: 'app-empresa-mercados',
  standalone: true,
  imports: [ListarproductoComponent, CreaeditacompraComponent, RouterOutlet],
  templateUrl: './empresa-mercados.component.html',
  styleUrls: ['./empresa-mercados.component.css']
})
export class EmpresaMercadosComponent {
  constructor(public route: ActivatedRoute) {}
}