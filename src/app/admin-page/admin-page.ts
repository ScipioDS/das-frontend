import {Component, inject, Inject} from '@angular/core';
import {HeaderComponent} from '../components/atoms/header';
import {EditCrypto} from '../components/edit-crypto/edit-crypto';
import {Subject, takeUntil} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-admin-page',
  imports: [
    HeaderComponent,
    MatDivider
  ],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css',
})
export class AdminPage {
  dialog = inject(MatDialog);
  private destroy$ = new Subject<void>();

  openEditDialog() {
    const dialogRef = this.dialog.open(EditCrypto, {
      width: '600px',
      maxWidth: '90vw',
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: any) => {
        if (result) {
          console.log('Cryptocurrency Created:', result);
        }
      });
  }
}
