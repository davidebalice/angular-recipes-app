import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../model/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor() {}

  ingredients: Ingredient[] = [
    new Ingredient('Apple',5),
    new Ingredient('Tomatoes',7)
  ];
}
