import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  usuario: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    if (!this.usuario || !this.password) {
      this.error = 'Por favor, completa ambos campos.';
      return;
    }

    this.authService.login(this.usuario, this.password).subscribe({
      next: () => {
        this.error = '';
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error de login:', err);
        this.error = 'Usuario o contraseña incorrectos.';
      },
    });
  }
}
