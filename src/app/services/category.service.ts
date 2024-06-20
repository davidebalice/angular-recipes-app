import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  catchError,
  tap,
  throwError,
} from 'rxjs';
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoriesUrl = '/categories/';
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  private subscription: Subscription;
  constructor(private http: HttpClient) {
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    });
  }

  fetchCategories(): void {
    const headers = this.getHeaders();
    this.subscription = this.http
      .get<Category[]>(this.categoriesUrl, { headers })

      .pipe(
        tap((categories: Category[]) => {
          this.categoriesSubject.next(categories);
        }),
        catchError((error) => {
          console.error('Error fetching categories:', error);
          return throwError(error);
        })
      )
      .subscribe();
  }

  getCategories(): Observable<Category[]> {
    return this.categoriesSubject.asObservable();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
