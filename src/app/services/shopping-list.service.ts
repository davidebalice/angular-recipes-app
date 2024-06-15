import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, catchError, map, throwError } from 'rxjs';
import { Ingredient } from '../model/ingredient.model';
import { ShoppingList } from '../model/shoppingList.model';
import { Router } from '@angular/router';

export class ShoppingListService {
  shoppingListArray = new Subject<ShoppingList[]>();
  ingredientChanged = new Subject<Ingredient[]>();
  private shoppingList: ShoppingList[];
  startedEditing = new Subject<number>();
  ingredients: Ingredient[];

  constructor(
    private shoppingListService: ShoppingListService,
    private http: HttpClient,
    private router: Router
  ) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    });
  }

  fetchShoppingList(): Observable<ShoppingList[]> {
    const headers = this.getHeaders();
    let apiUrl = '/shopping-list/';

    return this.http
      .get<{ Recipe }>(apiUrl, {
        headers,
      })
      .pipe(
        map((responseData) => {
          console.log(responseData);
          const slArray: ShoppingList[] = [];
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

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  getIngredients() {
    return this.ingredients;
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  addIngredients(ingredients: Ingredient[]) {
    for (let ingredient of ingredients) {
      this.ingredients.push(ingredient);
    }
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
