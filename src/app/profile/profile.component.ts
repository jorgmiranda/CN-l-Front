import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { MsalService } from '@azure/msal-angular';
import { jwtDecode } from "jwt-decode";
import { PacienteService } from '../service/paciente.service';
import { Paciente } from '../model/paciente';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

type ProfileType = {
  name?: string;
  preferred_username?: string;
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule
  ],
  styleUrls: [],
  standalone: true,
})
export class ProfileComponent implements OnInit {
  profile: ProfileType | undefined;
  pacientes: Paciente[] = [];

  constructor(private authService: MsalService,private http: HttpClient, private pacienteService: PacienteService) {}

  ngOnInit() {
    this.getProfile(environment.apiConfig.uri);
  }

  getProfile(url: string) {
    // Obtener el token del localStorage
    const token = localStorage.getItem('jwt');
  
    if (token) {
      try {
        // Decodificar el token sin usar jwt-decode (usando la función decodeTokenBase64Url)
        const decodedToken: any = this.decodeTokenBase64Url(token);
  
        // Extraer los datos deseados
        this.profile = {
          name: decodedToken.name,
          preferred_username: decodedToken.preferred_username,
        };
  
        console.log('Perfil decodificado:', this.profile);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    } else {
      console.error('No se encontró ningún token en el localStorage.');
    }
  }
  
  private decodeTokenBase64Url(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`)
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }
  llamarBackend(): void {
    this.pacienteService.obtenerTodosLosPacientes().subscribe(response => {
      this.pacientes = response;
    });
  }

  // mostrarResponseBackend(): string {
  //   return JSON.stringify(this.responseBackend);
  // }
}
