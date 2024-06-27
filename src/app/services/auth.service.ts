import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = '/login';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  errorMessage: string;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.authUrl, { username, password }).pipe(
      tap((response) => {
        this.setToken(response);
        this.isLoggedInSubject.next(true);
      }),
      catchError((error) => {
        this.errorMessage =
          'Login failed. Please check your credentials and try again.';
        return throwError(error);
      })
    );
  }

  private setToken(authResult: any): void {
    const token = authResult['jwt-token'];
    localStorage.setItem('token', token);
    this.router.navigate(['/recipes']);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.isLoggedInSubject.next(false);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
}
