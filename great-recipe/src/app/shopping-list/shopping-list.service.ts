import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredirnt.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

 private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Banana', 4),
 ]

  ingredientChanged = new Subject<Ingredient[]>();

  startEditing = new Subject<number>();



  getIngrediants() {
    return this.ingredients.slice();
  }

  getIngredient(index:number) {
    return this.ingredients[index];

  }



  addIngredient(ingredient:Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }
  addIngrediants(ingredients:Ingredient[]) {
    this.ingredients.push(...ingredients);
      this.ingredientChanged.next(this.ingredients.slice());
  }

    updateIngrediant(index:number , newIngredint:Ingredient) {

      this.ingredients[index] = newIngredint;
      this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngrediant(index:number) {
    this.ingredients.splice(index, 1);
          this.ingredientChanged.next(this.ingredients.slice());

  }


  constructor() {

  }
}
