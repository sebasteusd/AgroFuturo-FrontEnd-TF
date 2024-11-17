import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-empresa-home',
  templateUrl: './empresa-home.component.html',
  styleUrls: ['./empresa-home.component.css']
})
export class EmpresaHomeComponent implements OnInit {
  username: string;

  constructor(private route: ActivatedRoute) {
    // Suponiendo que el nombre de usuario se pasa como parámetro en la URL
    this.username = this.route.snapshot.paramMap.get('username') || 'Usuario';
  }

  ngOnInit(): void {
    // Aquí puedes agregar cualquier lógica de inicialización que necesites
  }
}
