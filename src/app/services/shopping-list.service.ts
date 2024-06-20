import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Observable,
  Subject,
  Subscription,
  catchError,
  map,
  tap,
  throwError,
} from 'rxjs';
import { Ingredient } from '../model/ingredient.model';

@Injectable()
export class ShoppingListService {
  shoppingListArray = new Subject<Ingredient[]>();
  shoppingListChanged = new Subject<Ingredient[]>();
  idSelected = new Subject<number>();
  shoppingList: Ingredient[];
  private subscription: Subscription;
  constructor(private http: HttpClient, private router: Router) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    });
  }

  fetchShoppingList(): Observable<Ingredient[]> {
    const headers = this.getHeaders();
    let apiUrl = '/shoppinglist/';

    return this.http
      .get<{ Recipe }>(apiUrl, {
        headers,
      })
      .pipe(
        map((responseData) => {
          const slArray: Ingredient[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              slArray.push({ ...responseData[key] });
            }
          }
          this.shoppingList = slArray;
          this.shoppingListArray.next(this.shoppingList.slice());
          return slArray;
        }),
        catchError((error) => {
          if (error.status === 401) {
            this.router.navigate(['/login']);
          }
          return throwError(() => new Error('Error loading recipes.'));
        })
      );
  }

  onIngredientAdded(ingredients: Ingredient) {
    this.shoppingList.push(ingredients);
  }

  getIngredients() {
    return this.shoppingList;
  }

  getIngredient(id: number) {
    return this.shoppingList.find((ingredient) => ingredient.id === id);
  }

  addIngredient(ingredient: Ingredient) {
    this.shoppingList.push(ingredient);
  }

  addIngredients(ingredients: Ingredient[]) {
    const headers = this.getHeaders();
    const apiUrl = '/shoppinglist/add-ingredients';

    this.subscription = this.http
      .post<Ingredient[]>(apiUrl, ingredients, { headers })
      .subscribe({
        next: (responseData) => {
          //salva messaggio
        },
        error: (error) => {
          console.error('Error adding ingredients:', error);
        },
      });
  }

  updateShoppingList(index: number, newShoppingList: Ingredient) {
    this.shoppingList[index] = newShoppingList;
    this.shoppingListChanged.next(this.shoppingList.slice());
  }

  deleteShoppingList(index: number) {
    this.shoppingList.splice(index, 1);
    this.shoppingListChanged.next(this.shoppingList.slice());
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updateItem(id: number, data: Ingredient) {
    const headers = this.getHeaders();
    return this.http
      .patch(`/shoppinglist/${id}`, data, {
        withCredentials: true,
        responseType: 'text',
        headers,
      })
      .pipe(
        tap((response) => {
          console.log('Response from backend:', response);
          this.fetchShoppingList().subscribe({
            next: (updatedList) => {
              console.log('Shopping list updated after patch:', updatedList);
            },
            error: (error) => {
              console.error('Error fetching shopping list after patch:', error);
            },
          });
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.router.navigate(['/login']);
          }
          return throwError(() => new Error('Error adding product.'));
        })
      );
  }

  addItem(data: Ingredient) {
    const headers = this.getHeaders();
    return this.http
      .post(`/shoppinglist/add`, data, {
        withCredentials: true,
        responseType: 'text',
        headers,
      })
      .pipe(
        tap((response) => {
          console.log('Response from backend:', response);
          this.fetchShoppingList().subscribe({
            next: (updatedList) => {
              console.log('Shopping list updated after patch:', updatedList);
            },
            error: (error) => {
              console.error('Error fetching shopping list after patch:', error);
            },
          });
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.router.navigate(['/login']);
          }
          return throwError(() => new Error('Error adding product.'));
        })
      );
  }

  deleteItem(id: number) {
    const headers = this.getHeaders();
    return this.http.delete(`/shoppinglist/${id}`, { headers }).pipe(
      tap((response) => {
        console.log('Response from backend:', response);
        this.fetchShoppingList().subscribe({
          next: (updatedList) => {
            console.log('Shopping list updated after delete:', updatedList);
          },
          error: (error) => {
            console.error('Error fetching shopping list after delete:', error);
          },
        });
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
        return throwError(() => new Error('Error adding product.'));
      })
    );
  }
}
