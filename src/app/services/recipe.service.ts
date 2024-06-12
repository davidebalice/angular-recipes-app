import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, catchError, map, throwError } from 'rxjs';
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
    private http: HttpClient
  ) {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.csrfToken.subscribe((value: string) => {
      this.csrfValue = value;
    });
  }

  bearerToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXJpb3Jvc3NpIiwiaWF0IjoxNzE4MTgzNzA3LCJleHAiOjE3MTgxODU1MDd9.mFTzHlzx8V20WDMswnbnIQFVjhwaJcb7NPXLQ8Jf6to';

  getCsrf() {
    const bearerToken = this.bearerToken;
    const csrfUrl = '/csrf';

    this.http
      .post(csrfUrl, null, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${bearerToken.trim()}`,
        }),
      })
      .subscribe(
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

  fetchRecipes() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Authorization: `Bearer ${this.bearerToken}`,
    });
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
            //if (responseData.hasOwnProperty(key)) {
            recipeArray.push({ ...responseData[key] });
            // }
          }
          return recipeArray;
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Authorization: `Bearer ${this.bearerToken}`,
    });

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
          console.log(responseData);
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
    this.recipes.push(recipe);
    this.recipesList.next(this.recipes.slice());
  }

  /*
   updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeList.next(this.recipes.slice());
  }
  */

  updateRecipe(id: number, newRecipe: Recipe) {
    const index = this.recipes.findIndex((recipe) => recipe.id === id);
    if (index !== -1) {
      newRecipe.id = id;
      this.recipes[index] = newRecipe;
    } else {
      console.error('Recipe with the specified ID does not exist');
    }
    this.recipesList.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesList.next(this.recipes.slice());
  }
}
