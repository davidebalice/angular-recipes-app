import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, take } from 'rxjs';
import { Recipe } from '../../model/recipes-model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {}

  onSelected() {
    this.router.navigate(['/recipes', this.recipe.id]);
  }

  private fetchRecipes() {
    this.recipeService
      .fetchRecipes()
      .pipe(
        take(1),
        catchError((error) => {
          console.error('Error fetching recipes', error);
          throw error;
        })
      )
      .subscribe((recipes) => {
         // recipes = recipes.filter((recipe) => recipe.id !== this.recipe.id);
       // this.updateRecipes.emit(recipes);
        this.router.navigate(['/recipes']);
        //this.recipeService.fetchRecipes();
        console.log('Updated recipes after deletion', recipes);
      });
  }

  onDeleteRecipe(recipeId: number) {
    const confirmDelete = confirm(
      'Are you sure you want to delete this recipe?'
    );
    if (confirmDelete) {
      this.recipeService
        .deleteRecipe(recipeId)
        .pipe(
          catchError((error) => {
            console.error('Error deleting recipe', error);
            throw error;
          })
        )
        .subscribe({
          next: () => {
            this.fetchRecipes();
          },
        });
    }
  }
}
