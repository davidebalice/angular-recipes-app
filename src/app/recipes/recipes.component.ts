import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  standalone: false,
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './recipes.component.css',
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  pagination: boolean = true;

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit() {}

  onBackRecipes() {}

  onNewRecipe() {
    this.router.navigate(['/recipes/new']);
  }

  onSearch(searchTerm: string): void {
    if (searchTerm && searchTerm.trim().length > 0) {
      this.router.navigate(['/recipes'], { queryParams: { key: searchTerm } });
    } else this.router.navigate(['/recipes']);
  }
}
