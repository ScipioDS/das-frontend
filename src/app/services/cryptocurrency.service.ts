import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CryptoPage} from '../models/interfaces/page-response';
import {CryptoFilter} from '../models/filter/CryptoFilter';
import {Cryptocurrency, CryptocurrencyHelper} from '../models/cryptocurrency';

@Injectable({
  providedIn: 'root'
})
export class CryptocurrencyService {
  baseUrl = environment.baseUrl + 'crypto';

  constructor(private http: HttpClient) {}

  getAllCryptocurrency() {
    return this.http.get(this.baseUrl + '/all');
  }

  getTop10Cryptocurrencies(): Observable<Cryptocurrency[]> {
    return this.http.get<Cryptocurrency[]>(this.baseUrl + '/top10');
  }

  getAllCryptocurrencyPaged(page: number, pageSize: number, filter: CryptoFilter): Observable<CryptoPage> {
    return this.http.post<CryptoPage>(`${this.baseUrl}/${page}/${pageSize}`, filter);
  }

  findByTicker(ticker: string) {
    return this.http.get<Cryptocurrency>(`${this.baseUrl}/${ticker}`);
  }

  getSavedCrypto(): Observable<Cryptocurrency[]>{
    return this.http.get<Cryptocurrency[]>(this.baseUrl + '/saved');
  }

  saveCrypto(cryptocurrencyId: number): Observable<Cryptocurrency> {
    return this.http.get<Cryptocurrency>(`${this.baseUrl}/save/${cryptocurrencyId}`);
  }

  removeCrypto(cryptocurrencyId: number): Observable<void> {
    return this.http.get<void>(`${this.baseUrl}/unsave/${cryptocurrencyId}`);
  }

  createCryptocurrency(crypto: CryptocurrencyHelper): Observable<Cryptocurrency> {
    return this.http.post<Cryptocurrency>(this.baseUrl + '/create', crypto);
  }

  updateCryptocurrency(id: string, crypto: CryptocurrencyHelper): Observable<Cryptocurrency> {
    return this.http.post<Cryptocurrency>(`${this.baseUrl}/update/${id}`, crypto);
  }
}
