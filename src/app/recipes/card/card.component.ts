import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, catchError, take } from 'rxjs';
import { AppConfig } from '../../app-config';
import { Recipe } from '../../model/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  @Input() recipe: Recipe;
  fullStars: number = 0;
  halfStar: boolean = false;
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

  getFullImageUrl(imageUrl: string): string {
    if (!imageUrl || imageUrl.trim() === '') {
      return '../../../assets/images/nophoto.jpg';
    }
    return `${AppConfig.apiUrl}/recipes/image/${imageUrl}`;
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

  onPhotoRecipe(recipeId: number) {
    this.router.navigate(['/recipes/photo', recipeId]);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onEditRecipe(recipeId: number) {
    this.router.navigate([`/recipes/${recipeId}/edit`]);
  }

  generateStarsArray(difficulty: number): string[] {
    const maxStars = 5;
    let starsArray: string[] = [];

    for (let i = 1; i <= maxStars; i++) {
      if (i <= difficulty) {
        starsArray.push('star');
      } else if (i - 0.5 <= difficulty) {
        starsArray.push('star_half');
      } else {
        starsArray.push('star_border');
      }
    }

    return starsArray;
  }
}
