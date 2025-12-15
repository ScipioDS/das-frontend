import {Component, Inject, OnInit} from '@angular/core';
import {CryptocurrencyService} from '../../services/cryptocurrency.service';
import {UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {Cryptocurrency} from '../../models/cryptocurrency';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edit-crypto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './edit-crypto.html',
  styleUrl: './edit-crypto.css',
})
export class EditCrypto implements OnInit {
  isAddMode: boolean = true;
  isSubmitting: boolean = false;
  errorMessage: string | null = null;

  model: UntypedFormGroup;

  constructor(
    private cryptoService: CryptocurrencyService,
    private fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<EditCrypto>,
    @Inject(MAT_DIALOG_DATA) public data: { crypto?: Cryptocurrency }
  ) {
    this.model = this.fb.group({
      ticker: [null, Validators.required],
      name: [null],
      price: [null, Validators.required],
    });
  }

  ngOnInit() {
    if (this.data?.crypto) {
      this.isAddMode = false;
      this.model.patchValue({
        ticker: this.data.crypto.ticker,
        name: this.data.crypto.name,
        price: this.data.crypto.price,
      });
    }
  }

  submit() {
    if (this.model.invalid) {
      this.model.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    const operation = this.isAddMode
      ? this.cryptoService.createCryptocurrency(this.model.value)
      : this.cryptoService.updateCryptocurrency(this.data.crypto!.id, this.model.value);

    operation.subscribe({
      next: (cryptocurrency: Cryptocurrency) => {
        console.log(
          this.isAddMode ? 'Cryptocurrency created:' : 'Cryptocurrency updated:',
          cryptocurrency
        );
        this.dialogRef.close(cryptocurrency);
      },
      error: (error) => {
        console.error('Error saving cryptocurrency:', error);
        this.errorMessage = error.error?.message || 'An error occurred while saving the cryptocurrency';
        this.isSubmitting = false;
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
