import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject, finalize, map, take } from 'rxjs';
import { Recipe } from '../../model/recipe.model';
import { CategoryService } from '../../services/category.service';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  id: number | undefined;
  recipeForm: FormGroup;
  recipe: Recipe;
  recipe$: Observable<Recipe> | undefined;
  submitting = false;
  private destroy$ = new Subject<void>();
  categories$: Observable<any[]>;

  get recipeControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private categoryService: CategoryService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];

      if (this.id !== undefined) {
        this.recipe$ = this.recipeService.getById(this.id);

        this.recipeService
          .getById(this.id)
          .pipe(
            map((recipe) => {
              this.recipe = recipe;
              this.initForm(this.recipe);
            })
          )
          .subscribe();
      }
    });
  }

  onSubmit() {
    if (this.recipeForm.valid && !this.submitting) {
      this.submitting = true;
      this.recipeService
        .updateRecipe(this.id, this.recipeForm.value)
        .pipe(
          take(1),
          finalize(() => {
            this.submitting = false;
            this.onCancel();
          })
        )
        .subscribe({
          next: (response) => {
            console.log('Recipe updated successfully', response);
          },
          error: (error) => {
            console.error('Error updating recipe', error);
          },
        });
    }
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        title: new FormControl(null, Validators.required),
        quantity: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm(recipe: Recipe) {
    let recipeTitle = recipe.title;
    let recipeIdCategory = recipe.idCategory;
    let recipeDifficulty = recipe.difficulty;
    let recipePreparationTime = recipe.preparationTime;
    let recipeCookingTime = recipe.cookingTime;
    let recipeDescription = recipe.description;
    let recipeTips = recipe.tips;
    let recipeIngredients = new FormArray([]);

    if (recipe.ingredients) {
      for (let ingredient of recipe.ingredients) {
        recipeIngredients.push(
          new FormGroup({
            title: new FormControl(ingredient.title, Validators.required),
            quantity: new FormControl(ingredient.quantity, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/),
            ]),
          })
        );
      }
    }

    this.recipeForm = new FormGroup({
      title: new FormControl(recipeTitle, Validators.required),
      idCategory: new FormControl(recipeIdCategory, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      tips: new FormControl(recipeTips),
      difficulty: new FormControl(recipeDifficulty, Validators.required),
      preparationTime: new FormControl(recipePreparationTime),
      cookingTime: new FormControl(recipeCookingTime),
      ingredients: recipeIngredients,
    });
  }

  loadCategories(): void {
    this.categoryService.fetchCategories();
    this.categories$ = this.categoryService.getCategories();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
