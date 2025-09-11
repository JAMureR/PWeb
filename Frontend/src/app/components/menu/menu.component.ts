import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <nav>
      <ul>
        <li *ngFor="let item of menu">{{ item.label }}</li>
      </ul>
    </nav>
  `
})
export class MenuComponent implements OnInit {
  menu: any[] = []; // 👈 variable que recibe los datos

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/menu')
      .subscribe({
        next: data => this.menu = data,  // 👈 asigna el resultado
        error: err => console.error('Error al cargar menu', err)
      });
  }
}
