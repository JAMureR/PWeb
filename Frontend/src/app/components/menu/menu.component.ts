import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

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
    ]),
    trigger('navAnim', [
      state('visible', style({ transform: 'translateY(0%)', opacity: 1 })),
      state('hidden', style({ transform: 'translateY(-100%)', opacity: 0 })),
      transition('visible => hidden', animate('600ms ease-out')),
      transition('hidden => visible', animate('600ms ease-out'))
    ])
  ]
})
export class MenuComponent implements OnInit, AfterViewInit {
  menu: any[] = [];
  menuOpen: boolean = false;
  activeItem: any = null;
  selectedLanguage: string = 'Español';
  languageMenuOpen: boolean = false;
  navState: 'visible' | 'hidden' = 'visible';
  private lastScroll = 0;

  @ViewChild('esloganContainer') esloganContainer!: ElementRef;

  // Variable para reiniciar animación del <p>
  animateDetalle: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('assets/data/menu.json'/*'http://localhost:8080/api/menu' CAMBIO DE BACKEND A JSON*/).subscribe({
      next: data => {
        this.menu = data;
        this.menu.forEach(item => item.isOpen = false);
      },
      error: err => console.error('Error al cargar menu', err)
    });
  }

  ngAfterViewInit(): void {
    this.resetEsloganAnimation();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    this.navState = (currentScroll > this.lastScroll && currentScroll > 80) ? 'hidden' : 'visible';
    this.lastScroll = currentScroll;
  }

  @HostListener('window:resize')
  onResize() {
    this.resetEsloganAnimation();

    // Reiniciar animación del <p>
    this.animateDetalle = false;
    setTimeout(() => this.animateDetalle = true, 20); // Angular recrea el <p>
  }

  private resetEsloganAnimation() {
    if (!this.esloganContainer) return;

    const spans: NodeListOf<HTMLElement> = this.esloganContainer.nativeElement.querySelectorAll('span');

    spans.forEach(span => {
      // eliminar clases de animación anteriores
      span.classList.remove('animate-left', 'animate-right');

      // forzar reflow
      span.offsetHeight;

      // asignar clases según la posición
      if (span.classList.contains('part1') || span.classList.contains('part3')) {
        span.classList.add('animate-left');
        span.style.animationDelay = span.classList.contains('part1') ? '0.2s' : '0.6s';
      } else if (span.classList.contains('part2') || span.classList.contains('part4')) {
        span.classList.add('animate-right');
        span.style.animationDelay = span.classList.contains('part2') ? '0.4s' : '0.8s';
      }
    });
  }

  toggleSubmenu(item: any) {
    this.activeItem = (this.activeItem === item) ? null : item;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleLanguageMenu() {
    this.languageMenuOpen = !this.languageMenuOpen;
  }

  selectLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.languageMenuOpen = false;
  }
}
