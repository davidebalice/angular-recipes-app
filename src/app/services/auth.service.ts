import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = '/login';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(this.authUrl, { username: username, password: password })
      .pipe(tap((response) => this.setToken(response)));
  }

  private setToken(authResult: any): void {
    const token = authResult['jwt-token'];
    localStorage.setItem('token', token);
    this.router.navigate(['/recipes']);
  }
  
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
