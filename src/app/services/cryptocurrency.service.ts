import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CryptoPage} from '../models/interfaces/page-response';
import {CryptoFilter} from '../models/filter/CryptoFilter';

@Injectable({
  providedIn: 'root'
})
export class CryptocurrencyService {
  baseUrl = environment.baseUrl + 'crypto';

  constructor(private http: HttpClient) {}

  getAllCryptocurrency() {
    return this.http.get(this.baseUrl + '/all');
  }

  getAllCryptocurrencyPaged(page: number, pageSize: number, filter: CryptoFilter): Observable<CryptoPage> {
    return this.http.post<CryptoPage>(`${this.baseUrl}/${page}/${pageSize}`, filter);
  }
}
