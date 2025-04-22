import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ColorListComponent } from '../color-list/color-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    ColorListComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  nombreUsuario: string | null = null;
  rol: string | null = null;
  menuAbierto = false;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}



  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    const data = this.authService.getUserDataFromToken();
    if (data) {
      this.nombreUsuario =
        data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ?? null;
      this.rol =
        data['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ?? null;
      console.log('Usuario:', this.nombreUsuario, '| Rol:', this.rol);
    }else {
      console.log('No se encontraron datos de usuario en el token.');
      this.router.navigate(['/login']);
    } // Redirigir a la página de inicio
  }

}
