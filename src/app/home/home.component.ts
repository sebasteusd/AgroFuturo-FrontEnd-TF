import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent {
  showAgricultoresInfo = false;
  showEmpresasInfo = false;

  constructor(private router: Router) {}

  navigateTo(type: string) {
    if (type === 'agricultores') {
      this.router.navigate(['/agricultores-login']);
    } else if (type === 'empresas') {
      this.router.navigate(['/empresas-login']);
    }
  }

  scrollToSection(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }

  toggleInfo(type: string) {
    if (type === 'agricultores') {
      this.showAgricultoresInfo = !this.showAgricultoresInfo;
    } else if (type === 'empresas') {
      this.showEmpresasInfo = !this.showEmpresasInfo;
    }
  }
}