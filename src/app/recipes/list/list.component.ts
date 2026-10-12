import { Component, Input, OnDestroy, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DeleteConfirmationModalComponent } from '../../components/delete-confirmation-modal/delete-confirmation-modal.component';
import { DemoModalComponent } from '../../components/demo-modal/demo-modal.component';
import { Recipe } from '../../model/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  standalone: false,
  selector: 'app-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  loadedRecipes: Recipe[] = [];
  paginatedRecipes: Recipe[] = [];
  isLoading = true;
  error = null;
  totalItems: number;
  currentPage: number = 1;
  private errorSub: Subscription;
  private queryParamSub: Subscription;
  private routeParamsSub: Subscription;
  @Input() page: string;
  @Input() limit: number;
  @Input() pagination: boolean;
  @ViewChild(DeleteConfirmationModalComponent)
  deleteModal: DeleteConfirmationModalComponent;
  showModal: boolean = false;
  @ViewChild(DemoModalComponent)
  demoModal: DemoModalComponent;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  isHome: boolean = false;

  openDeleteConfirmationModal(recipeId: number) {
    this.deleteModal.recipeId = recipeId;
    this.deleteModal.open();
  }

  onDeleteConfirmed(recipeId: number): void {
    try {
      this.subscription = this.recipeService.deleteRecipe(recipeId).subscribe(
        () => {
          console.log(`Recipe deleted successfully!`);
          this.fetchRecipes();
        },
        (error) => {
          console.error('Error deleting recipe:', error.error);
          if (error.error.message.includes('Demo')) {
            this.demoModal.open();
          }
          throw error;
        }
      );
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  ngOnInit() {
    this.isHome = this.page === 'home';
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
    this.subscription = this.recipeService
      .fetchRecipes(searchKey, categoryId, this.limit, this.currentPage)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.loadedRecipes = response.recipes.map((recipe) => ({
            ...recipe,
            categoryName: recipe.categoryDto?.name || 'Unknown Category',
          }));
          this.totalItems = response.totalItems;
          this.paginateRecipes();
        },
        error: (error) => {
          this.isLoading = false;
          this.error = error.message;
          console.log(error);
        },
      });
  }

  onPageChanged(event: any): void {
    this.currentPage = event.page;
    this.fetchRecipes();
  }

  paginateRecipes() {
    const startIndex = (this.currentPage - 1) * this.limit;
    const endIndex = startIndex + this.limit;
    this.paginatedRecipes = this.loadedRecipes.slice(startIndex, endIndex);
  }

  closeDemoModal(): void {
    this.showModal = false;
  }
}
