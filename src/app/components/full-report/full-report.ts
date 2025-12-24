import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {CryptoPrediction} from '../../services/prediction.service';
import {MatChip} from '@angular/material/chips';

@Component({
  selector: 'app-full-report',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatCardModule,
    NgxChartsModule,
    MatChip
  ],
  templateUrl: './full-report.html',
  styleUrl: './full-report.css',
})
export class FullReport implements OnInit {
  dialogRef = inject(MatDialogRef<FullReport>);
  data = inject(MAT_DIALOG_DATA);
  predictionService = inject(CryptoPrediction);

  crypto = this.data.crypto;
  name = this.data.name;

  analysisData: any = null;
  isLoading: boolean = true;
  error: string | null = null;

  // Chart data for predictions
  predictionChartData: any[] = [];

  ngOnInit() {
    this.loadAnalysis();
  }

  loadAnalysis() {
    this.isLoading = true;
    this.predictionService.getCompleteAnalysis(this.name).subscribe({
      next: (data) => {
        this.analysisData = data;
        this.preparePredictionChart();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading analysis:', error);
        this.error = 'Failed to load analysis data';
        this.isLoading = false;
      }
    });
  }

  preparePredictionChart() {
    if (this.analysisData?.lstmAnalysis?.predictions) {
      this.predictionChartData = [
        {
          name: 'Predicted Price',
          series: this.analysisData.lstmAnalysis.predictions.map((pred: any) => ({
            name: new Date(pred.date).toLocaleDateString(),
            value: pred.predicted_price
          }))
        }
      ];
    }
  }

  getSignalColor(signal: string): string {
    if (!signal) return 'default';
    signal = signal.toUpperCase();
    if (signal === 'DEFAULT') return 'primary';
    if (signal === 'BUY' || signal === 'BULLISH') return 'success';
    if (signal === 'SELL' || signal === 'BEARISH') return 'warn';
    return 'accent';
  }

  getSentimentColor(sentiment: string): string {
    if (!sentiment) return 'default';
    sentiment = sentiment.toLowerCase();
    if (sentiment === 'positive' || sentiment === 'bullish') return 'primary';
    if (sentiment === 'negative' || sentiment === 'bearish') return 'warn';
    return 'accent';
  }

  close() {
    this.dialogRef.close();
  }
}
