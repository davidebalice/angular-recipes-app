import { Component, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService,    private router: Router,
  ) {}

  ngOnInit() {
    /*
    this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });*/
  }

  onBackRecipes() {
    // this.selectedRecipe = null;
  }

  onNewRecipe() {
    this.router.navigate(['/recipes/new']);
  }
}
