import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
}
