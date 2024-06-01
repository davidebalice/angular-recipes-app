import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../../model/recipes-model';
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrl: './recipes-item.component.css',
})
export class RecipesItemComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {}

  onSelected() {
    this.router.navigate(['/recipes', this.recipe.id]);
  }
}
