import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

// Interfaz para tipado seguro del menú y submenús
interface MenuItem {
  label: string;
  isOpen?: boolean;
  subItems?: MenuItem[];
  [key: string]: any; // permite otras propiedades si existen en JSON
}

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
export class MenuComponent implements OnInit, AfterViewInit, OnDestroy {

  menu: MenuItem[] = [];
  menuOpen: boolean = false; // menú principal
  mobileMenuOpen: boolean = false; // menú móvil hamburguesa
  activeItem: MenuItem | null = null;
  selectedLanguage: string = 'Español';
  languageMenuOpen: boolean = false;
  navState: 'visible' | 'hidden' = 'visible';
  private lastScroll = 0;

  @ViewChild('esloganContainer') esloganContainer!: ElementRef<HTMLDivElement>;

  animateDetalle: boolean = true;
  private mouseFollowEnabled: boolean = false;
  private esloganTimeout: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<MenuItem[]>('assets/data/menu.json').subscribe({
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

  ngOnDestroy(): void {
    clearTimeout(this.esloganTimeout);
  }

  /** Animación inicial de los spans y seguimiento del ratón */
  private resetEsloganAnimation(): void {
    if (!this.esloganContainer?.nativeElement) return;

    this.mouseFollowEnabled = false;

    const container: HTMLElement = this.esloganContainer.nativeElement;
    const spans: NodeListOf<HTMLElement> = container.querySelectorAll('span');

    spans.forEach(span => {
      span.classList.remove('animate-left', 'animate-right');
      span.style.opacity = '0';
      span.style.transform = 'translateX(0)';
      span.style.animationDelay = '0s';
    });

    container.offsetHeight;

    spans.forEach(span => {
      if (span.classList.contains('part1') || span.classList.contains('part3')) {
        span.classList.add('animate-left');
        span.style.animationDelay = span.classList.contains('part1') ? '0.2s' : '0.6s';
      } else if (span.classList.contains('part2') || span.classList.contains('part4')) {
        span.classList.add('animate-right');
        span.style.animationDelay = span.classList.contains('part2') ? '0.4s' : '0.8s';
      }
    });

    clearTimeout(this.esloganTimeout);
    this.esloganTimeout = setTimeout(() => {
      spans.forEach(span => {
        span.style.opacity = '1';
        span.style.transform = 'translateX(0)';
      });
      this.mouseFollowEnabled = true;
    }, 2000);
  }

  /** Movimiento del ratón sobre el h1 */
  onEsloganMouseMove(event: MouseEvent): void {
    if (!this.mouseFollowEnabled || !this.esloganContainer?.nativeElement) return;

    const span: HTMLElement | null = this.esloganContainer.nativeElement.querySelector('span.eslogan');
    if (!span) return;

    const rect = span.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const centerX = rect.width / 2;

    let diff = (offsetX - centerX) / centerX;
    diff = Math.max(-1, Math.min(1, diff));

    const maxOffset = 50;
    const spans: NodeListOf<HTMLElement> = span.querySelectorAll('span');

    spans.forEach(span => {
      const sameDirection = span.classList.contains('part1') || span.classList.contains('part3');
      const direction = sameDirection ? 1 : -1;
      const offset = diff * maxOffset * direction;
      span.style.transform = `translateX(${offset}px)`;
    });
  }

  onEsloganMouseLeave(): void {
    if (!this.mouseFollowEnabled || !this.esloganContainer?.nativeElement) return;

    const span: HTMLElement | null = this.esloganContainer.nativeElement.querySelector('span.eslogan');
    if (!span) return;

    const spans: NodeListOf<HTMLElement> = span.querySelectorAll('span');
    spans.forEach(span => {
      span.style.transform = 'translateX(0)';
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    this.navState = (currentScroll > this.lastScroll && currentScroll > 80) ? 'hidden' : 'visible';
    this.lastScroll = currentScroll;
  }

  @HostListener('window:resize')
  onResize(): void {
    this.resetEsloganAnimation();
    this.animateDetalle = false;
    setTimeout(() => this.animateDetalle = true, 20);
  }

  /** Toggle submenú */
  toggleSubmenu(item: MenuItem): void {
    this.activeItem = (this.activeItem === item) ? null : item;
    if (item.subItems) item.isOpen = !item.isOpen;
  }

  /** Toggle menú principal (para hamburguesa móvil) */
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleLanguageMenu(): void {
    this.languageMenuOpen = !this.languageMenuOpen;
  }

  selectLanguage(lang: string): void {
    this.selectedLanguage = lang;
    this.languageMenuOpen = false;
  }
}
