import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../model/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit {
  ingredients: Ingredient[];

  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  onAddItem() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    //this.ingredientAdded.emit(newIngredient);
    this.shoppingListService.addIngredient(newIngredient);
  }

  onDeleteItem() {}

  onClearItem() {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
  }
}
