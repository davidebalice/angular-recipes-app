import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, finalize, map, take } from 'rxjs';
import { Recipe } from '../../model/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.css',
})
export class PhotoComponent implements OnInit {
  id: number | undefined;
  editMode = false;
  recipeForm: FormGroup;
  recipe: Recipe;
  recipe$: Observable<Recipe> | undefined;
  submitting = false;
  file: any;

  get recipeControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.editMode = params['id'] != null;
      this.id = +params['id'];

      if (this.editMode) {
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
      }
    });
  }

  uploadImage(event: any) {
    this.file = event.target.files[0];
  }

  onSubmit() {
    if (!this.submitting) {
      
      this.submitting = true;
      this.recipeService
        .uploadRecipe(this.id, this.file)
        .pipe(
          take(1),
          finalize(() => {
            this.submitting = false;
            this.router.navigate(['../../'], { relativeTo: this.route });
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

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm(recipe: Recipe) {
    let recipeImageUrl = '';

    if (this.editMode && recipe) {
      recipeImageUrl = recipe.imageUrl;
    }

    this.recipeForm = new FormGroup({
      image: new FormControl(recipeImageUrl, Validators.required),
    });
  }
}
