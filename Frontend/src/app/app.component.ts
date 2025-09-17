import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InsightComponent } from './components/insight/insight.component';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, InsightComponent],
  template: `
    <app-menu></app-menu>
    <app-insight></app-insight>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
}
