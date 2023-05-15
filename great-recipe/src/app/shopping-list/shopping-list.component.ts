import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredirnt.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Banana', 4),
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onIngredientAdd(ingredient:Ingredient) {
    this.ingredients.push(ingredient);
  }

}
