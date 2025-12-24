import {Component, OnInit} from '@angular/core';
import {MatFormField, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDivider} from '@angular/material/divider';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-header',
  template: `
    <div class="container mt-3">
      <header class="d-flex justify-content-between">
        <div class="h1 preknow-white preknow-logo" routerLink="/explore">
          PreKnow
        </div>
        <div>
          <button
            class="btn btn-light me-3"
            routerLink="/admin"
          >
            Open Admin Page
          </button>
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
        </div>
      </header>
      <mat-divider class="preknow-white"></mat-divider>
      <div class="d-flex justify-content-between mt-2">
        <div class="d-flex">
          <mat-icon class="preknow-white me-2">account_circle</mat-icon>
          @if (userSource != null) {
            <div class="h5 preknow-logo preknow-white" (click)="openProfile()">{{user}}</div>
          } @else {
            <div class="h5 preknow-logo preknow-white" routerLink="/login">Log In</div>
          }
        </div>
        @if (userSource) {
          <div class="h5 preknow-white me-2 preknow-logo" (click)="doLogOut()">Log Out</div>
        }
      </div>
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
export class HeaderComponent implements OnInit {
  searchQuery: string = '';
  userSource: User | null = null;
  user: string = 'Log In';
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(
      (res) => {
        if (res) {
          this.userSource = res;
          this.user = res.email;
          this.isAdmin = res.role.name === 'ADMIN';
        }
      }
    );
  }

  onSearch(): void {
    this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
  }

  doLogOut(): void {
    this.userSource = null;
    this.userService.doLogout();
    this.router.navigate(['/explore']);
  }

  openProfile(): void {
    this.router.navigate(['/profile', this.userSource?.id]);
  }
}
