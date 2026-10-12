import { Component, Input, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppConfig } from '../../app-config';
import { DeleteConfirmationModalComponent } from '../../components/delete-confirmation-modal/delete-confirmation-modal.component';
import { Recipe } from '../../model/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { ListComponent } from '../list/list.component';

@Component({
  standalone: false,
  selector: 'app-card',
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  @ViewChild(DeleteConfirmationModalComponent)
  deleteModal: DeleteConfirmationModalComponent;
  @Input() recipe: Recipe;
  fullStars: number = 0;
  halfStar: boolean = false;
  private subscription: Subscription;
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private listComponent: ListComponent
  ) {}

  ngOnInit(): void {}

  onSelected() {
    this.router.navigate(['/recipes', this.recipe.id]);
  }

  openDeleteConfirmationModal(recipeId: number) {
    this.listComponent.openDeleteConfirmationModal(recipeId);
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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onEditRecipe(recipeId: number) {
    this.router.navigate([`/recipes/${recipeId}/edit`]);
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
