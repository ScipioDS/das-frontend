import {Component} from '@angular/core';
import {MatFormField, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDivider} from '@angular/material/divider';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-header',
  template: `
    <div class="container mt-3">
      <header class="d-flex justify-content-between">
        <div class="h1 preknow-white preknow-logo" routerLink="/explore">
          PreKnow
        </div>
        <mat-form-field appearance="fill" class="search-field">
          <input
            matInput
            type="search"
            placeholder="Search..."
            [(ngModel)]="searchQuery"
            (keyup.enter)="onSearch()">
          <button matSuffix mat-icon-button aria-label="Search" class="me-2" (click)="onSearch()">
            <mat-icon>search</mat-icon>
          </button>
        </mat-form-field>
      </header>
      <mat-divider class="preknow-white"></mat-divider>
    </div>
  `,
  imports: [
    MatFormField,
    MatInput,
    MatIconButton,
    MatIcon,
    MatDivider,
    RouterLink,
    MatSuffix,
    FormsModule
  ],
  styles: [`
    .preknow-logo {
      cursor: pointer;
    }

    .search-field {
      width: 25vw;
    }
  `]
})
export class HeaderComponent {
  searchQuery: string = '';

  constructor(private router: Router) {}

  onSearch(): void {
    if (this.searchQuery.trim()) {
      // Option 1: Navigate to a search results page
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });

      // Option 2: Emit event to parent component (if using EventEmitter)
      // this.searchEvent.emit(this.searchQuery);
    }
  }
}
