import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CryptoPage} from '../models/interfaces/page-response';
import {CryptoFilter} from '../models/filter/CryptoFilter';
import {Cryptocurrency} from '../models/cryptocurrency';

@Injectable({
  providedIn: 'root'
})
export class CryptoPriceService {
  baseUrl = environment.baseUrl + 'crypto-price';

  constructor(private http: HttpClient) {}

  getByTickerLastNMonths(ticker: string, months: number = 3): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${ticker}/last-months/${months}`);
  }
}
