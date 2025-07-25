import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { GET_COUNTRIES } from 'src/app/graphql/queries';

@Component({
  standalone: true,
  selector: 'app-country-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './country-list.html',
  styleUrl: './country-list.scss',
})
export class CountryList {
  username = '';
  limit = 10;

  page = signal(1);
  totalPages = signal(0);
  countries = signal<any[]>([]);
  loading = signal(false);

  constructor(private apollo: Apollo) {}

  fetchCountries(page: number = 1) {
    if (!this.username || this.limit < 1 || this.limit > 50) return;

    this.loading.set(true);
    this.page.set(page);

    this.apollo
      .watchQuery({
        query: GET_COUNTRIES,
        variables: {
          username: this.username,
          limit: this.limit, // 👈 se usa solo para el primer request
          page: page,
          perPage: 10,        // 👈 controla la paginación real
        },
        fetchPolicy: 'network-only' // 🔁 fuerza actualización real
      })
      .valueChanges.subscribe({
        next: (result: any) => {
          const topCountries = result.data.topCountries;
          this.countries.set(topCountries.data);
          this.totalPages.set(topCountries.last_page);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('❌ Error GraphQL:', err);
          this.loading.set(false);
        },
      });
  }

  goToPage(p: number) {
    if (p !== this.page()) {
      this.fetchCountries(p);
    }
  }
}
