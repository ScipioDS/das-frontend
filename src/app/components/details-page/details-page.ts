import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeaderComponent} from '../atoms/header';
import {NgxChartsModule, Color, ScaleType} from '@swimlane/ngx-charts';
import {multi} from '../../mockdata/data';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatDivider} from '@angular/material/divider';
import {CryptocurrencyService} from '../../services/cryptocurrency.service';
import {CryptoPriceService} from '../../services/cryptoprice.service';

@Component({
  selector: 'app-details-page',
  imports: [
    HeaderComponent,
    NgxChartsModule,
    MatProgressSpinner,
    MatDivider
  ],
  templateUrl: './details-page.html',
  styleUrl: './details-page.css',
})
export class DetailsPage implements OnInit{
  cryptoService = inject(CryptocurrencyService);
  cryptoPriceService = inject(CryptoPriceService);

  crypto: any = null;

  name: string = '';
  isLoading: boolean = false;
  predictedPrice: number | null = null;
  lastPrice: number | null = null;

  // options for chart
  multi: any[] = multi;
  view: [number, number] = [500, 300]; // Changed to tuple type
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
    this.route.paramMap.subscribe(params => {
      this.name = params.get('name') || '';
      this.cryptoPriceService.getByTickerLastNMonths(this.name).subscribe(
        (data: any[]) => {
          this.multi = [
            {
              name: 'TBTC Close Price',
              series: data.map(item => ({
                name: item.date.substring(0, 10),
                value: item.close
              }))
            }
          ];

          const mostRecent = data.reduce((a, b) => new Date(a.date) > new Date(b.date) ? a : b);
          this.lastPrice = mostRecent.close; // This is the latest closing price

        }
      )
    });
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
}
