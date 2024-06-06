import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../model/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  ingredients: Ingredient[];
  subscription: Subscription;
  editedItemIndex: number;
  editMode = false;
  editItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editedItemIndex,
        newIngredient
      );
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onDeleteItem(form: NgForm) {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onResetItem(form);
  }

  onResetItem(form: NgForm) {
    this.editMode = false;
    form.reset();
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        console.log(index);
        this.editedItemIndex = index;
        this.editMode = true;
        this.editItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
