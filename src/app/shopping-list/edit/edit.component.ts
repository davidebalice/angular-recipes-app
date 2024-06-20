import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, finalize, take } from 'rxjs';
import { Ingredient } from '../../model/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  shoppingList: Ingredient[];
  subscription: Subscription;
  editedItemId: number;
  editMode = false;
  editItem: Ingredient;
  @Output() closeForm: EventEmitter<void> = new EventEmitter<void>();

  constructor(private shoppingListService: ShoppingListService) {}

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.title, value.quantity);
    if (this.editMode) {
      this.shoppingListService
        .updateItem(form.value.id, value)
        .pipe(
          take(1),
          finalize(() => {
            this.editMode = false;
            form.reset();
          })
        )
        .subscribe({
          next: (response) => {
            console.log('Ingredient updated successfully', response);
          },
          error: (error) => {
            console.error('Error updating recipe', error);
          },
        });

      this.shoppingListService.updateShoppingList(
        this.editedItemId,
        newIngredient
      );
    } else {
      this.shoppingListService
        .addItem(value)
        .pipe(
          take(1),
          finalize(() => {
            this.editMode = false;
            form.reset();
          })
        )
        .subscribe({
          next: (response) => {
            console.log('Ingredient added successfully', response);
            this.closeForm.emit();
          },
          error: (error) => {
            console.error('Error updating recipe', error);
          },
        });

      this.shoppingListService.updateShoppingList(
        this.editedItemId,
        newIngredient
      );
    }
  }

  onDeleteItem(form: NgForm) {
    this.shoppingListService.deleteShoppingList(this.editedItemId);
    this.onResetItem(form);
  }

  onResetItem(form: NgForm) {
    this.editMode = false;
    form.reset();
  }

  ngOnInit(): void {
    this.shoppingList = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.idSelected.subscribe(
      (id: number) => {
        this.editedItemId = id;
        this.editMode = true;
        this.editItem = this.shoppingListService.getIngredient(id);
        this.slForm.setValue({
          id: this.editItem.id,
          title: this.editItem.title,
          quantity: this.editItem.quantity,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
