import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../model/ingredient.model';
import { Recipe } from '../model/recipes-model';
import { ShoppingListService } from './shopping-list.service';

@Injectable()
export class RecipeService {
  recipesList = new Subject<Recipe[]>();
  recipeSelected = new Subject<Recipe>();

  constructor(private shoppingListService: ShoppingListService) {}

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

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  getById(id: number): Recipe {
    return this.recipes.find((recipe) => recipe.id === id);
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
