import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, finalize, take, takeUntil } from 'rxjs';
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

  get recipeControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.recipeForm = this.formBuilder.group({
      title: ['', Validators.required],
      image: [''],
      description: [''],
      idCategory: 0,
      ingredients: this.formBuilder.array([]),
    });
  }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
  }

  onSubmit() {
    if (this.recipeForm.valid && !this.submitting) {
      this.submitting = true;
      this.recipeService
        .addRecipe(this.recipeForm.value)
        //.addRecipe(formData)
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

      if (this.imageFile) {
        formData.append('image', this.imageFile, this.imageFile.name);
      }

      const ingredients = this.recipeForm.get('ingredients')?.value;
      ingredients.forEach((ingredient: any, index: number) => {
        formData.append(`ingredients[${index}][title]`, ingredient.title);
        formData.append(`ingredients[${index}][quantity]`, ingredient.quantity);
      });


     /*
      formData.append('recipeDto', JSON.stringify({
        title: this.recipeForm.get('title')?.value,
        description: this.recipeForm.get('description')?.value,
        idCategory: this.recipeForm.get('idCategory')?.value,
        ingredients: this.recipeForm.get('ingredients')?.value  // Aggiungi gli ingredienti direttamente
      }));*/


      /*
      console.log('formData');
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      */
     
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
