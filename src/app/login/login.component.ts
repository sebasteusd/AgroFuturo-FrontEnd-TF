import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { AgricultorService } from '../services/agricultor.service';
import { EmpresaService } from '../services/empresa.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  users: any[] = [];
  agricultores: any[] = [];
  empresas: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private agricultorService: AgricultorService,
    private empresaService: EmpresaService
  ) {}

  ngOnInit() {
    this.authService.getUsers().subscribe(users => {
      this.users = users;
    });
    this.agricultorService.list().subscribe(agricultores => {
      this.agricultores = agricultores;
    });
    this.empresaService.list().subscribe(empresas => {
      this.empresas = empresas;
    });
  }

  onLogin() {
    const user = this.users.find(u => u.username === this.username && u.password === this.password);
    if (user) {
      console.log('Login exitoso', user);

      // Almacenar la información del usuario en localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));

      const datosAgricultor = {
        nombreAgricultor: user.nombreUsuario,
        correoAgricultor: user.correoUsuario,
        telefonoAgricultor: user.telefonoUsuario,
        ubicacionAgricultor: 'X',
        tipoProductoAgricultor: 'X'
      };

      const datosEmpresa = {
        nombreEmpresa: user.nombreUsuario,
        correoEmpresa: user.correoUsuario,
        telefonoEmpresa: user.telefonoUsuario,
        ubicacionEmpresa: 'X',
        tipoIndustria: 'X'
      };

      if (user.tipoUsuario === 'agricultor') {
        const existingAgricultor = this.agricultores.find(a => a.nombreAgricultor === user.nombreUsuario && a.correoAgricultor === user.correoUsuario);
        if (existingAgricultor) {
          // Agricultor ya existe, redirigir sin crear uno nuevo
          this.router.navigate(['/agricultor-home', { username: user.username }]);
        } else {
          // Crear nuevo Agricultor
          this.agricultorService.registerFromUser(user.idUsuario, datosAgricultor).subscribe(() => {
            this.router.navigate(['/agricultor-home', { username: user.username }]);
          });
        }
      } else if (user.tipoUsuario === 'empresa') {
        const existingEmpresa = this.empresas.find(e => e.nombreEmpresa === user.nombreUsuario && e.correoEmpresa === user.correoUsuario);
        if (existingEmpresa) {
          // Empresa ya existe, redirigir sin crear una nueva
          this.router.navigate(['/empresa-home', { username: user.username }]);
        } else {
          // Crear nueva Empresa
          this.empresaService.registerFromUser(user.idUsuario, datosEmpresa).subscribe(() => {
            this.router.navigate(['/empresa-home', { username: user.username }]);
          });
        }
      }
    } else {
      console.error('Error de login: Usuario o contraseña incorrectos');
    }
  }

  showRegister() {
    this.router.navigate(['/register']);
  }

  goback() {
    this.location.back();
  }
}