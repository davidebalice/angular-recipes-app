import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../../model/recipes-model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  subscription: Subscription;
  loadedRecipes: Recipe[] = [];
  isLoading = true;
  error = null;
  private errorSub: Subscription;
  csrf = null;
  csrfSub: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.errorSub = this.recipeService.error.subscribe((errorMessage) => {
      this.error = errorMessage;
    });

    this.isLoading = true;
    this.recipeService.fetchRecipes().subscribe((recipes) => {
      this.isLoading = false;
      this.loadedRecipes = recipes;
    });
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

  onUpdateRecipes() {
    this.onFetchRecipes();
  }

  onFetchRecipes() {
    this.isLoading = true;
    this.recipeService.fetchRecipes().subscribe({
      next: (recipes) => {
        this.isLoading = false;
        this.loadedRecipes = recipes;
      },
      error: (error) => {
        this.isLoading = false;
        this.error = error.message;
        console.log(error);
      },
    });
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
