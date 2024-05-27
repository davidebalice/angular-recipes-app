import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../model/ingredient.model';
import { Recipe } from '../model/recipes-model';
import { ShoppingListService } from './shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService){
    
  }

  private recipes: Recipe[] = [
    new Recipe(
      'Test recipe',
      'Lorem ipsum',
      'https://www.foodandwine.com/thmb/fjNakOY7IcuvZac1hR3JcSo7vzI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/FAW-recipes-pasta-sausage-basil-and-mustard-hero-06-cfd1c0a2989e474ea7e574a38182bbee.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Fries', 20)]
    ),
    new Recipe(
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

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
