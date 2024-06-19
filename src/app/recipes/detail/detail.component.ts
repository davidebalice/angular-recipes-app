import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Recipe } from '../../model/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { AppConfig } from '../../app-config';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit {
  recipe: Recipe;
  recipe$: Observable<Recipe> | undefined;
  id: number | undefined;
  
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
    if (this.recipe$) {
      this.subscription = this.recipe$.subscribe((recipe) => {
        this.recipeService.addIngredientsToShoppingList(recipe.ingredients);
      });
    }
  }

  getFullImageUrl(imageUrl: string): string {
    return `${AppConfig.apiUrl}/recipes/image/${imageUrl}`;
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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
