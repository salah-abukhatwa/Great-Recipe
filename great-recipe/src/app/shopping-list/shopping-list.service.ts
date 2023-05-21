import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredirnt.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

 private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Banana', 4),
 ]

  ingredientChanged = new EventEmitter<Ingredient[]>();



  getIngrediant() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient:Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.emit(this.ingredients.slice());
  }
  addIngrediants(ingredients:Ingredient[]) {
    this.ingredients.push(...ingredients);
      this.ingredientChanged.emit(this.ingredients.slice());
}


  constructor() { }
}
