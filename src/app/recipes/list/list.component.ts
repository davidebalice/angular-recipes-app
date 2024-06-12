import { Component, OnInit } from '@angular/core';
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
  //recipes: Recipe[];
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

  /*
  ngOnInit() {
    this.subscription = this.recipeService.recipesList.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
*/

  ngOnInit() {
  
    this.errorSub = this.recipeService.error.subscribe((errorMessage) => {
      this.error = errorMessage;
    });
  
    this.isLoading = true;
    this.recipeService.fetchRecipes().subscribe((recipes) => {
      this.isLoading = false;
      console.log(recipes);
      this.loadedRecipes = recipes;
    });
  }

  ngOnDestroy(): void {
   this.errorSub.unsubscribe();
  }

  /*
  onCreateProduct(productForm: NgForm, productData: Product) {
    this.productService.createProduct(
      productData.id,
      productData.name,
      productData.description,
      productData.idCategory,
      productData.price
    );
    productForm.reset();
  }
*/

  onFetchRecipes() {
    this.isLoading = true;
    this.recipeService.fetchRecipes().subscribe(
      (recipes) => {
        this.isLoading = false;
        this.loadedRecipes = recipes;
      },
      (error) => {
        this.error = error.message;
      }
    );
  }
  /*
  onDeleteProducts(id: string) {
    this.recipeService.deleteProduct(id);
  } 
  

*/

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
