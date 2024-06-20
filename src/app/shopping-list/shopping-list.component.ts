import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Ingredient } from '../model/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingList: Ingredient[] = [];
  private destroy$: Subject<void> = new Subject<void>();
  new: boolean = false;
  edit: boolean = false;

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

    this.shoppingListService
      .fetchShoppingList()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (ingredients: Ingredient[]) => {},
        error: (error) => {
          console.error('Error fetching shopping list:', error);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onShowAdd() {
    this.edit = false;
    this.new = true;
  }

  onEditItem(id: number) {
    this.edit = true;
    this.new = false;
    this.shoppingListService.idSelected.next(id);
  }

  onDeleteItem(id: number) {
    this.new = false;
    this.edit = false;
    if (confirm('Delete this item?')) {
      this.shoppingListService.deleteItem(id).subscribe({
        next: () => {
          console.log('Item deleted successfully.');
        },
        error: (error) => {
          console.error('Error deleting item:', error);
        },
      });
    }
  }

  onCloseForm() {
    this.new = false;
    this.edit = false;
  }

  handleCloseForm() {
    this.new = false;
    this.edit = false;
  }
}
