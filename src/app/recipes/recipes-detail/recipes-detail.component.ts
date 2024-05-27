import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../model/recipes-model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrl: './recipes-detail.component.css',
})
export class RecipesDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() backRecipes = new EventEmitter<void>();

  constructor(private recipeService: RecipeService){

  }

  onBackRecipes() {
    this.backRecipes.emit();
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
