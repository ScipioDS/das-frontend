import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = environment.baseUrl + 'auth/';
  constructor(private http: HttpClient) { }

  doLogin(loginDTO: any) {
    return this.http.post(`${this.baseUrl}login`, loginDTO);
  }

  doRegister(registerDTO: any) {
    return this.http.post(`${this.baseUrl}signup`, registerDTO);
  }
}
