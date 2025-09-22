import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menu: any[] = [];
  menuOpen: boolean = false; // controla el menú hamburguesa

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/menu')
      .subscribe({
        next: data => {
          this.menu = data;
          this.menu.forEach(item => item.isOpen = false);
        },
        error: err => console.error('Error al cargar menu', err)
      });
  }

  toggleSubmenu(item: any) {
    this.menu.forEach(i => {
      if (i !== item) i.isOpen = false;
    });
    item.isOpen = !item.isOpen;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
