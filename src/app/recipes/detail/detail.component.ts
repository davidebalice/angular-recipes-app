import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../../model/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit {
  recipe: Recipe;
  recipe$: Observable<Recipe> | undefined;
  id: number | undefined;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      if (this.id !== undefined) {
        this.recipe$ = this.recipeService.getById(this.id);
      }
    });
  }

  onAddToShoppingList() {
    if (this.recipe$) {
      this.recipe$.subscribe((recipe) => {
        this.recipeService.addIngredientsToShoppingList(recipe.ingredients);
      });
    }
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  onBackRecipes() {
    this.router.navigate(['/recipes']);
  }
}
