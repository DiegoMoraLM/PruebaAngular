import { Component } from '@angular/core';
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
export class DashboardComponent {
  menuAbierto = false;

  constructor(private authService: AuthService, private router: Router) {}

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
      const nombreUsuario =
        data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      const rol =
        data['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      console.log('Usuario:', nombreUsuario, '| Rol:', rol);
    }
  }
}
