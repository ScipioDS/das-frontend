import {Component, inject, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeaderComponent} from '../atoms/header';
import {NgxChartsModule, Color, ScaleType} from '@swimlane/ngx-charts';
import {multi} from '../../mockdata/data';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatDivider} from '@angular/material/divider';
import {CryptocurrencyService} from '../../services/cryptocurrency.service';
import {CryptoPriceService} from '../../services/cryptoprice.service';
import {UserService} from '../../services/user.service';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {Cryptocurrency} from '../../models/cryptocurrency';
import {Subject, takeUntil, switchMap, forkJoin, of} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {FullReport} from '../full-report/full-report';
import {EditCrypto} from '../edit-crypto/edit-crypto';
import {CryptoPrediction} from '../../services/prediction.service';

@Component({
  selector: 'app-details-page',
  imports: [
    HeaderComponent,
    NgxChartsModule,
    MatProgressSpinner,
    MatDivider,
    MatIcon,
    MatTooltip
  ],
  templateUrl: './details-page.html',
  styleUrl: './details-page.css',
})
export class DetailsPage implements OnInit, OnDestroy {
  cryptoService = inject(CryptocurrencyService);
  cryptoPriceService = inject(CryptoPriceService);
  predictionService = inject(CryptoPrediction);
  userService = inject(UserService);
  dialog = inject(MatDialog);

  private destroy$ = new Subject<void>();

  crypto: any = null;
  user: any = null;
  userLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isSaved: boolean = false;
  savedCrypto: Cryptocurrency[] = [];

  name: string = '';
  isLoading: boolean = false;
  predictedPrice: number | null = null;
  lastPrice: number | null = null;
  trend: string | null = null;

  // options for chart
  multi: any[] = multi;
  view: [number, number] = [500, 300];
  legend: boolean = false;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Price (USD)';
  timeline: boolean = true;

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      switchMap(params => {
        this.name = params.get('name') || '';
        return this.cryptoPriceService.getByTickerLastNMonths(this.name);
      }),
      switchMap((priceData: any[]) => {
        // Process chart data
        this.multi = [
          {
            name: this.name + ' Close Price',
            series: priceData.map(item => ({
              name: item.date.substring(0, 10),
              value: item.close
            }))
          }
        ];

        // Calculate last price
        const mostRecent = priceData.reduce((a, b) =>
          new Date(a.date) > new Date(b.date) ? a : b
        );
        this.lastPrice = mostRecent.close;

        // Get crypto details
        return this.cryptoService.findByTicker(this.name);
      }),
      switchMap(crypto => {
        this.crypto = crypto;

        // Get current user
        return this.userService.getCurrentUser();
      }),
      switchMap(user => {
        if (user) {
          this.user = user;
          this.userLoggedIn = true;
          this.isAdmin = user.role.name === 'ADMIN';

          // Get saved crypto list
          return this.cryptoService.getSavedCrypto();
        }
        return of(null);
      })
    ).subscribe({
      next: (savedCryptoData) => {
        if (savedCryptoData) {
          this.savedCrypto = savedCryptoData;
          this.isSaved = this.savedCrypto.some(saved => saved.id === this.crypto.id);
        }
        this.isLoading = true
        this.predictionService.getLSTAnalysis(this.name).subscribe((predictionData) => {
          if (predictionData.trend) {
            this.trend = predictionData.trend;
          }
          if (predictionData.predictions && predictionData.predictions.length > 0) {
            const latestPrediction = predictionData.predictions.reduce((a: any, b: any) =>
              new Date(a.date) > new Date(b.date) ? a : b
            );
            this.predictedPrice = latestPrediction.predicted_price;
          }
          this.isLoading = false;
        });
      },
      error: (error) => {
        console.error('Error loading crypto details:', error);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  saveToUser() {
    this.cryptoService.saveCrypto(this.crypto.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isSaved = true;
        },
        error: (error) => {
          console.error('Error saving crypto:', error);
        }
      });
  }

  removeFromUser() {
    this.cryptoService.removeCrypto(this.crypto.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isSaved = false;
        },
        error: (error) => {
          console.error('Error removing crypto:', error);
        }
      });
  }

  getFullReport() {
    const dialogRef = this.dialog.open(FullReport, {
      width: '800px',
      maxWidth: '90vw',
      data: {
        crypto: this.crypto,
        name: this.name
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        console.log('Dialog closed', result);
      });
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(EditCrypto, {
      width: '600px',
      maxWidth: '90vw',
      data: {
        crypto: this.crypto
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          console.log('Cryptocurrency updated:', result);
          // Refresh the crypto data
          this.crypto = result;
        }
      });
  }

  deleteCrypto() {
    if (confirm(`Are you sure you want to delete ${this.crypto.name}?`)) {
      // Add your delete logic here
      console.log('Delete crypto:', this.crypto.id);
    }
  }
}
