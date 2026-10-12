import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from '../../model/category.model';
import { Recipe } from '../../model/recipe.model';
import { CategoryService } from '../../services/category.service';
import { RecipeService } from '../../services/recipe.service';

@Component({
  standalone: false,
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  selectedCategory: Category = null;
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  subscription: Subscription;

  constructor(
    private categoryService: CategoryService,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.fetchCategories();
    this.subscription = this.categoryService
      .getCategories()
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  onSelectCategory(category: Category): void {
    this.selectedCategory = category;
    this.fetchRecipesByCategory(category);

    if (category) {
      this.router.navigate([`/recipes/idcat/${category.id}`]);
    }
  }

  fetchRecipesByCategory(category: Category): void {
    this.recipeService.fetchRecipes('', category.id).subscribe({
      next: (recipes) => {
        // this.recipes = recipes;
      },
      error: (error) => {
        console.error('Error fetching recipes by category:', error);
      },
    });
  }
}
