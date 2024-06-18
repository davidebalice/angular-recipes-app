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
