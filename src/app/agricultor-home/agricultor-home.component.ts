import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agricultor-home',
  templateUrl: './agricultor-home.component.html',
  styleUrls: ['./agricultor-home.component.css']
})
export class AgricultorHomeComponent implements OnInit {
  username: string;

  constructor(private route: ActivatedRoute) {
    // Suponiendo que el nombre de usuario se pasa como parámetro en la URL
    this.username = this.route.snapshot.paramMap.get('username') || 'Usuario';
  }

  ngOnInit(): void {
    // Aquí puedes agregar cualquier lógica de inicialización que necesites
  }

  verNoticia() {
    // Lógica para ver la noticia
    console.log('Ver Noticia');
  }

  verVideo() {
    // Lógica para ver el video
    console.log('Ver Video');
  }

  
}
