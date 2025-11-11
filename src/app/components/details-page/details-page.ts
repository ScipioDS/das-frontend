import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeaderComponent} from '../atoms/header';
import {NgxChartsModule, Color, ScaleType} from '@swimlane/ngx-charts';
import {multi} from '../../mockdata/data';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatDivider} from '@angular/material/divider';

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
  name: string = '';
  isLoading: boolean = false;
  predictedPrice: number = 35000;

  // options for chart
  multi: any[] = multi;
  view: [number, number] = [500, 300]; // Changed to tuple type
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
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
