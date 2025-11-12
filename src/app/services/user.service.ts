import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, catchError, Observable, of, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl+'users/';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }
  getCurrentUser(): Observable<User | null> {
    // If user is already loaded, return it as Observable immediately
    if (this.currentUserSubject.value) {
      return of(this.currentUserSubject.value);
    }

    const token = localStorage.getItem('jwtToken');
    console.log('token', token);
    if (!token) {
      // If no token, emit null (not logged in)
      this.currentUserSubject.next(null);
      return of(null);
    }

    // Check if token is expired
    if (this.isTokenExpired(token)) {
      console.log('Token is expired');
      this.doLogout();
      return of(null);
    }

    // Fetch user from API and update the subject
    console.log('Getting user');
    return this.http.get<User>(this.baseUrl + 'me').pipe(
      tap(user => this.currentUserSubject.next(user)),
      catchError(error => {
        console.error('Failed to fetch current user:', error);
        this.currentUserSubject.next(null);
        return of(null);
      })
    );
  }

  doLogout(): void {
    localStorage.removeItem('jwtToken');
    this.currentUserSubject.next(null);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000; // Convert to milliseconds
      return Date.now() >= expirationTime;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return true; // If we can't decode it, treat it as expired
    }
  }

}
