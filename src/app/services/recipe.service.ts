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
import { Recipe } from '../model/recipe.model';
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

  private getHeadersForm(): HttpHeaders {
    return new HttpHeaders({
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

  fetchRecipes(keyword?: string, category?: number): Observable<Recipe[]> {
    const headers = this.getHeaders();
    let apiUrl = '/recipes/';
    let params = new HttpParams();

    if (keyword) {
      apiUrl = '/recipes/search';
      params = params.append('keyword', keyword);
    } else {
      if (category > 0) {
        apiUrl = '/recipes/searchByCategoryId';
        console.log('param category');
        console.log(category);
        params = params.append('categoryId', category);
      }
    }

    return this.http
      .get<{ Recipe }>(apiUrl, {
        headers,
        params,
      })
      .pipe(
        map((responseData) => {
          console.log(responseData);
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
    //addRecipe(recipe: FormData) {
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

  addRecipeWithPhoto(recipe: FormData) {
    const headers = this.getHeadersForm();

    return this.http.post(`/recipes/add-with-photo`, recipe, { headers }).pipe(
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

  updateRecipe(id: number, dataRecipe: Recipe) {
    const headers = this.getHeaders();
    console.log(dataRecipe);
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

  uploadRecipe(id: number, imageFile: File) {
    const formData = new FormData();
    if (imageFile instanceof File) {
      formData.append('image', imageFile, imageFile.name);

      const url = `/recipes/${id}/uploadImage`;

      const headers = new HttpHeaders();
      headers.set('Cache-Control', 'no-cache');

      return this.http.post(url, formData, { headers }).pipe(
        tap((response) => {
          console.log('Response from backend:', response);
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.router.navigate(['/login']);
          }
          return throwError(() => new Error('Error uploading image.'));
        })
      );
    }
  }

}
