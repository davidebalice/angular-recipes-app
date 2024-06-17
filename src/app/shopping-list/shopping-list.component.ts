import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../services/shopping-list.service';
import { Ingredient } from '../model/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingList: Ingredient[] = [];
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingList = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.shoppingListChanged.subscribe(
      (shoppingList: Ingredient[]) => {
        this.shoppingList = this.shoppingList;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEditItem(i: number) {
    this.shoppingListService.startedEditing.next(i);
  }
}
