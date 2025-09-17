import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-insight',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="insights">
    <h2 class="insights__title">Insights</h2>
      <div class="insights__grid">
        <article class="insight-card" *ngFor="let i of insights">
          <div class="insight-card__media">
            <img [src]="i.imageUrl" [alt]="i.title" />
          </div>
          <div class="insight-card__body">
            <h3 class="insight-card__title">{{ i.title }}</h3>
            <p class="insight-card__summary">{{ i.summary }}</p>
            <div class="insight-card__cta">
              <button class="btn-primary">{{ i.cta }}</button>
            </div>
          </div>
        </article>
      </div>
</section>
  `,
  styleUrls: ['./insight.component.css'],
  
})
export class InsightComponent implements OnInit {
  insights: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/insights')
      .subscribe({
        next: data => this.insights = data,
        error: err => console.error('Error cargando insights', err)
      });
  }
}
