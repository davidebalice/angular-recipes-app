import { Ingredient } from '../model/ingredient.model';

export class ShoppingListService {
  ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 7),
  ];

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  getIngredients() {
    return this.ingredients;
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  addIngredients(ingredients: Ingredient[]){
    for(let ingredient of ingredients){
      this.ingredients.push(ingredient);
    }
  }
}
