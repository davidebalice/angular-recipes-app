import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ShoppingListService } from '../services/shopping-list.service';
import { Ingredient } from '../model/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingList: Ingredient[] = [];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingListService.shoppingListArray
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (ingredients: Ingredient[]) => {
          this.shoppingList = ingredients;
        },
        error: (error) => {
          console.error('Error fetching shopping list:', error);
        },
      });

    this.shoppingListService.fetchShoppingList()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (ingredients: Ingredient[]) => {
        },
        error: (error) => {
          console.error('Error fetching shopping list:', error);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
