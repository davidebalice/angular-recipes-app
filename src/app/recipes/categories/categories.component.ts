import { Component, OnInit } from '@angular/core';
import { Category } from '../../model/category.model';
import { Recipe } from '../../model/recipe.model';
import { CategoryService } from '../../services/category.service';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: Category = null;
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];

  constructor(
    private categoryService: CategoryService,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
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
