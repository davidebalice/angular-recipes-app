import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, catchError } from 'rxjs';
import { AppConfig } from '../../app-config';
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
  slMessage: boolean = false;

  private subscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params) => {
      this.id = +params['id'];
      if (this.id !== undefined) {
        this.recipe$ = this.recipeService.getById(this.id);
      }
    });
  }

  onAddToShoppingList() {
    if (confirm('Add ingredients to shopping list?'))
      if (this.recipe$) {
        this.subscription = this.recipe$.subscribe((recipe) => {
          this.recipeService.addIngredientsToShoppingList(recipe.ingredients);
          this.slMessage = true;
        });
      }
  }

  getFullImageUrl(imageUrl: string): string {
    if (!imageUrl || imageUrl.trim() === '') {
      return '../../../assets/images/nophoto.jpg';
    }
    return `${AppConfig.apiUrl}/recipes/image/${imageUrl}`;
  }

  onPhotoRecipe(recipeId: number) {
    this.router.navigate(['/recipes/photo', recipeId]);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
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
            this.router.navigate(['/recipes']);
          },
        });
    }
  }

  onBackRecipes() {
    this.router.navigate(['/recipes']);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
