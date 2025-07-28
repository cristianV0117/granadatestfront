import { Component, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { GET_LOGS } from 'src/app/graphql/queries';
import { DELETE_LOG, UPDATE_LOG } from 'src/app/graphql/mutations';

@Component({
  selector: 'app-logs-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './logs-list.html',
  styleUrl: './logs-list.scss',
})
export class LogsList {
  logs = signal<any[]>([]);
  startDate = '';
  endDate = '';
  editUsernameValue = '';

  currentPage = signal(1);
  perPage = 30;

  editId = signal<number | null>(null);
  editUsername = signal('');

  loading = signal(false);

  constructor(private apollo: Apollo) {
    this.fetchLogs();
  }

  fetchLogs() {
    this.loading.set(true);
    this.apollo
      .query<any>({
        query: GET_LOGS,
        variables: {
          start_date: this.startDate || null,
          end_date: this.endDate || null,
        },
        fetchPolicy: 'no-cache',
      })
      .subscribe({
        next: ({ data }) => {
          this.logs.set(data.getLogs);
          this.currentPage.set(1);
        },
        complete: () => this.loading.set(false),
        error: () => this.loading.set(false),
      });
  }

  paginatedLogs() {
    const all = this.logs();
    const start = (this.currentPage() - 1) * this.perPage;
    return all.slice(start, start + this.perPage);
  }

  totalPages(): number {
    return Math.ceil(this.logs().length / this.perPage);
  }

  goToPage(p: number) {
    this.currentPage.set(p);
  }

  deleteLog(id: number) {
    if (!confirm('¿Estás seguro de que deseas eliminar este registro?')) return;
    this.loading.set(true);

    this.apollo
      .mutate({
        mutation: DELETE_LOG,
        variables: { id },
      })
      .subscribe({
        next: () => {
          this.editId.set(null);
          this.fetchLogs();
        },
        complete: () => this.loading.set(false),
        error: () => this.loading.set(false),
      });
  }

  startEdit(log: any) {
    this.editId.set(log.id);
    this.editUsername.set(log.username);
    this.editUsernameValue = log.username;
  }

  saveEdit() {
    const username = this.editUsernameValue.trim();
    if (!username) return alert('El nombre no puede estar vacío');

    this.loading.set(true);
    this.apollo
      .mutate({
        mutation: UPDATE_LOG,
        variables: {
          id: this.editId(),
          username,
        },
      })
      .subscribe({
        next: () => {
          this.editId.set(null);
          this.fetchLogs();
        },
        complete: () => this.loading.set(false),
        error: () => this.loading.set(false),
      });
  }
  
  parseCountries(details: string): { name: string; density: number }[] {
    try {
      const parsed = JSON.parse(details);
      return Object.values(parsed).map((entry: any) => ({
        name: entry.name,
        density: entry.density,
      }));
    } catch {
      return [];
    }
  }
}
