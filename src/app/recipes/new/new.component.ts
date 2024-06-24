import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, finalize, take, takeUntil } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrl: './new.component.css',
})
export class NewComponent implements OnInit {
  recipeForm: FormGroup;
  submitting = false;
  imageFile: File | null = null;
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
    this.recipeForm = this.formBuilder.group({
      title: ['', Validators.required],
      image: [''],
      description: [''],
      preparationTime: [''],
      cookingTime: [''],
      tips: [''],
      difficulty: [''],
      idCategory: 0,
      ingredients: this.formBuilder.array([]),
    });
  }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
  }

  onSubmit() {
    if (this.recipeForm.valid && !this.submitting) {
      console.log(this.recipeForm.value);
      this.submitting = true;
      this.recipeService
        .addRecipe(this.recipeForm.value)
        .pipe(
          take(1),
          finalize(() => {
            this.submitting = false;
            this.onCancel();
          }),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (response) => {
            console.log('Recipe added successfully', response);
          },
          error: (error) => {
            //console.error('Error adding recipe', error);
          },
        });
    }
  }

  onSubmitWithPhoto() {
    if (this.recipeForm.valid && !this.submitting) {
      const formData = new FormData();

      formData.append('title', this.recipeForm.get('title')?.value);
      formData.append('description', this.recipeForm.get('description')?.value);
      formData.append('idCategory', this.recipeForm.get('idCategory')?.value);
      formData.append('preparationTime', this.recipeForm.get('preparationTime')?.value);
      formData.append('cookingTime', this.recipeForm.get('cookingTime')?.value);
      formData.append('tips', this.recipeForm.get('tips')?.value);
      formData.append('difficulty', this.recipeForm.get('difficulty')?.value);

      if (this.imageFile) {
        formData.append('image', this.imageFile, this.imageFile.name);
      }

      const ingredients = this.recipeForm.get('ingredients')?.value;
      ingredients.forEach((ingredient: any, index: number) => {
        formData.append(`ingredients[${index}][title]`, ingredient.title);
        formData.append(`ingredients[${index}][quantity]`, ingredient.quantity);
      });

      this.submitting = true;
      this.recipeService
        .addRecipeWithPhoto(formData)
        .pipe(
          take(1),
          finalize(() => {
            this.submitting = false;
            this.onCancel();
          }),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (response) => {
            console.log('Recipe added successfully', response);
          },
          error: (error) => {
            //console.error('Error adding recipe', error);
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

  loadCategories(): void {
    this.categoryService.fetchCategories();
    this.categories$ = this.categoryService.getCategories();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
