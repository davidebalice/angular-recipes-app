import { Component, Input } from '@angular/core';
import { Recipe } from '../../../model/recipes-model';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrl: './recipes-item.component.css',
})
export class RecipesItemComponent {
  @Input() recipe: Recipe;
}
