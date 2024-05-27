import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../../model/recipes-model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css',
})
export class RecipesListComponent implements OnInit {
  
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  constructor(private recipeService: RecipeService) {}

  recipes: Recipe[] = [];

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }
}
