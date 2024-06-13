import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, catchError, map, tap, throwError } from 'rxjs';
import { Ingredient } from '../model/ingredient.model';
import { Recipe } from '../model/recipes-model';
import { ShoppingListService } from './shopping-list.service';

@Injectable()
export class RecipeService implements OnInit, OnDestroy {
  recipesList = new Subject<Recipe[]>();
  recipeSelected = new Subject<Recipe>();
  error = new Subject<string>();
  csrfToken: Subject<string> = new Subject<string>();
  csrfValue: string;
  private recipes: Recipe[];
  tokenValue: string;

  constructor(
    private shoppingListService: ShoppingListService,
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.csrfToken.subscribe((value: string) => {
      this.csrfValue = value;
    });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    });
  }

  getCsrf() {
    const csrfUrl = '/csrf';

    this.http.post(csrfUrl, null, {}).subscribe(
      (response: any) => {
        this.csrfToken.next(response.token.trim());
        this.csrfValue = response.token.trim();
        this.error.next(null);
      },
      (error) => {
        console.error('Error fetching CSRF token', error);
        this.error.next(error.message);
      }
    );
  }

  fetchRecipes(): Observable<Recipe[]> {
    const headers = this.getHeaders();

    let params = new HttpParams();
    params = params.append('test1', '1');
    params = params.append('test2', '1');

    return this.http
      .get<{ [key: string]: Recipe }>('/recipes/', {
        headers,
        params,
      })
      .pipe(
        map((responseData) => {
          const recipeArray: Recipe[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              recipeArray.push({ ...responseData[key] });
            }
          }
          this.recipes = recipeArray;
          this.recipesList.next(this.recipes.slice());
          return recipeArray;
        }),
        catchError((error) => {
          if (error.status === 401) {
            this.router.navigate(['/login']);
          }
          return throwError(() => new Error('Error loading recipes.'));
        })
      );
  }

  /*
  private recipes: Recipe[] = [
    new Recipe(
      1,
      'Test recipe',
      'Lorem ipsum',
      'https://www.foodandwine.com/thmb/fjNakOY7IcuvZac1hR3JcSo7vzI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/FAW-recipes-pasta-sausage-basil-and-mustard-hero-06-cfd1c0a2989e474ea7e574a38182bbee.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Fries', 20)]
    ),
    new Recipe(
      2,
      'Test recipe',
      'Lorem ipsum',
      'https://www.allrecipes.com/thmb/mvO1mRRH1zTz1SvbwBCTz78CRJI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/67700_RichPastaforthePoorKitchen_ddmfs_4x3_2284-220302ec8328442096df370dede357d7.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Bread', 1),
        new Ingredient('Buns', 2),
      ]
    ),
  ];
*/

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  getById(id: number): Observable<Recipe> {
    const headers = this.getHeaders();

    let params = new HttpParams();
    params = params.append('test1', '1');
    params = params.append('test2', '1');

    return this.http
      .get<Recipe>(`/recipes/${id}`, {
        headers,
        params,
      })
      .pipe(
        map((responseData) => {
          responseData.imagePath = null;
          responseData.ingredients = null;
          return responseData;
        }),
        catchError((error) => {
          console.error('Errore nella richiesta HTTP', error);
          return throwError(error);
        })
      );
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    const headers = this.getHeaders();

    return this.http
      .post(`/recipes/add`, recipe, {
        withCredentials: true,
        headers,
      })
      .pipe(
        tap((response) => {
          console.log('Response from backend:', response);
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.router.navigate(['/login']);
          }
          return throwError(() => new Error('Error adding product.'));
        })
      );
  }

  /*
  updateRecipe(id: number, newRecipe: Recipe) {
    const index = this.recipes.findIndex((recipe) => recipe.id === id);
    if (index !== -1) {
      newRecipe.id = id;
      this.recipes[index] = newRecipe;
      this.recipesList.next(this.recipes.slice()); 
    } else {
      console.error('Recipe with the specified ID does not exist');
    }
  }*/

  updateRecipe(id: number, dataRecipe: Recipe) {
    const headers = this.getHeaders();

    return this.http
      .patch(`/recipes/${id}`, dataRecipe, {
        withCredentials: true,
        responseType: 'text',
        headers,
      })
      .pipe(
        tap((response) => {
          console.log('Response from backend:', response);
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.router.navigate(['/login']);
          }
          return throwError(() => new Error('Error adding product.'));
        })
      );
  }

  deleteRecipe(recipeId: number) {
    const headers = this.getHeaders();
    return this.http.delete(`/recipes/${recipeId}`, { headers });
  }
}
