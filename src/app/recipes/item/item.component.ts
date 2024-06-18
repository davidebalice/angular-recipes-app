import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, catchError, take } from 'rxjs';
import { Recipe } from '../../model/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent implements OnInit {
  @Input() recipe: Recipe;
  private subscription: Subscription;
  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {}

  onSelected() {
    this.router.navigate(['/recipes', this.recipe.id]);
  }

  private fetchRecipes() {
    this.subscription = this.recipeService
      .fetchRecipes()
      .pipe(
        take(1),
        catchError((error) => {
          console.error('Error fetching recipes', error);
          throw error;
        })
      )
      .subscribe((recipes) => {
        this.router.navigate(['/reload']).then(() => {
          this.router.navigate(['/recipes']);
        });
        console.log('Updated recipes after deletion', recipes);
      });
  }

  onDeleteRecipe(recipeId: number) {
    const confirmDelete = confirm(
      'Are you sure you want to delete this recipe?'
    );
    if (confirmDelete) {
      this.subscription = this.recipeService
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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
