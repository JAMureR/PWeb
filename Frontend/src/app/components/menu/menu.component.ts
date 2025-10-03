import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
  trigger('submenuAnim', [
    state('closed', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
    state('open', style({ height: '*', opacity: 1, overflow: 'hidden' })),
    transition('closed <=> open', animate('500ms ease-in-out'))
  ])
]
  
})
export class MenuComponent implements OnInit {
  menu: any[] = [];
  menuOpen: boolean = false;
  activeItem: any = null; //   el item actualmente abierto
  //  idioma
  selectedLanguage: string = 'Español';
  languageMenuOpen: boolean = false;

  constructor(private http: HttpClient) { }

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
    if (this.activeItem === item) {
      // Si haces clic en el mismo item → cerrar
      this.activeItem = null;
    } else {
      // Si es otro item → abrir
      this.activeItem = item;
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  //  MÉTODOS DE LENGUAJE
  toggleLanguageMenu() {
    this.languageMenuOpen = !this.languageMenuOpen;
  }

  selectLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.languageMenuOpen = false;
  }
  
}

