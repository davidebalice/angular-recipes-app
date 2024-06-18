import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Observable,
  Subject,
  Subscription,
  catchError,
  map,
  throwError,
} from 'rxjs';
import { Ingredient } from '../model/ingredient.model';

@Injectable()
export class ShoppingListService {
  shoppingListArray = new Subject<Ingredient[]>();
  shoppingListChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
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
          console.log(responseData);
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

  getIngredient(index: number) {
    return this.shoppingList[index];
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
}
