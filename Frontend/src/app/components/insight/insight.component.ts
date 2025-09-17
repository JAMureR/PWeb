import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-insight',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h2>Insights</h2>
      <div *ngFor="let i of insights" class="insight-card">
        <img [src]="i.imageUrl" alt="{{ i.title }}" width="150">
        <h3>{{ i.title }}</h3>
        <p>{{ i.summary }}</p>
        <button>{{ i.cta }}</button>
      </div>
    </section>
  `,
  styles: [`
    section {
      padding: 20px;
    }
    .insight-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 10px;
      margin-bottom: 15px;
      max-width: 300px;
    }
    img {
      border-radius: 4px;
      margin-bottom: 10px;
    }
    button {
      background: #007bff;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 5px;
      cursor: pointer;
    }
    button:hover {
      background: #0056b3;
    }
  `]
})
export class InsightComponent implements OnInit {
  insights: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/insights')
      .subscribe({
        next: data => this.insights = data,
        error: err => console.error('Error cargando insights', err)
      });
  }
}
