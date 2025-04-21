import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorService, DisplayColor } from '../../services/color.service';

@Component({
  selector: 'app-color-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.scss'],
})
export class ColorListComponent implements OnInit {
  colores: DisplayColor[] = [];
  userId: number = 0;

  constructor(private colorService: ColorService) {
    // SSR-safe: verificamos que esté en el navegador
    if (typeof window !== 'undefined') {
      this.userId = Number(localStorage.getItem('user_id')) || 0;
    }
  }

  ngOnInit(): void {
    this.getColores();
  }

  getColores(): void {
    this.colorService.getColores().subscribe({
      next: (data) => (this.colores = data),
      error: (err) => console.error('Error al obtener colores', err),
    });
  }

  asignarColor(color: string): void {
    this.colorService.assignColor(this.userId, color).subscribe({
      next: () => this.getColores(),
      error: (err) => console.error('Error al asignar color', err),
    });
  }

  resetColores(): void {
    this.colorService.resetUserColors(this.userId).subscribe({
      next: () => this.getColores(),
      error: (err) => console.error('Error al resetear colores', err),
    });
  }
}
