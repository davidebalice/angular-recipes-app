import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../../model/recipes-model';
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrl: './recipes-item.component.css',
})
export class RecipesItemComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
  }
 
  //@Output() recipeSelected = new EventEmitter<void>();

  onSelected() {
    //this.recipeSelected.emit();
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
