import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../../model/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  loadedRecipes: Recipe[] = [];
  isLoading = true;
  error = null;
  private errorSub: Subscription;
  private queryParamSub: Subscription;
  private routeParamsSub: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.errorSub = this.recipeService.error.subscribe((errorMessage) => {
      this.error = errorMessage;
    });

    this.queryParamSub = this.route.queryParams.subscribe((params) => {
      const searchKey = params['key'] || '';
      const categoryId = parseInt(this.route.snapshot.paramMap.get('idcat'));
      if (categoryId) {
        this.fetchRecipes(searchKey, categoryId);
      } else {
        this.fetchRecipes(searchKey);
      }
    });

    this.routeParamsSub = this.route.params.subscribe((params) => {
      const categoryId = params['idcat'] || 0;
      const searchKey = this.route.snapshot.queryParams['key'] || '';
      if (categoryId) {
        this.fetchRecipes(searchKey, categoryId);
      } else {
        this.fetchRecipes(searchKey);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.errorSub) {
      this.errorSub.unsubscribe();
    }
    if (this.queryParamSub) {
      this.queryParamSub.unsubscribe();
    }
    if (this.routeParamsSub) {
      this.routeParamsSub.unsubscribe();
    }
  }

  onUpdateRecipes() {
    this.fetchRecipes();
  }

  fetchRecipes(searchKey?: string, categoryId?: number) {
    this.isLoading = true;
    this.subscription = this.recipeService.fetchRecipes(searchKey, categoryId).subscribe({
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
