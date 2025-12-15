import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoPrediction {
  baseUrl = environment.baseUrl + 'crypto';

  constructor(private http: HttpClient) {}

  getCompleteAnalysis(ticker: string, months: number = 3): Observable<any[]> {
    const params = new HttpParams().set('ticker', ticker);
    return this.http.get<any[]>(`${this.baseUrl}/analysis/complete`, { params });
  }

  getLSTAnalysis(ticker: string, months: number = 3): Observable<any> {
    const params = new HttpParams().set('ticker', ticker);
    return this.http.get<any>(`${this.baseUrl}/lstm-analysis`, { params });
  }
}
