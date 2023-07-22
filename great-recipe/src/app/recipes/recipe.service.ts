import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredirnt.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeChanged = new Subject<Recipe[]>()

  // private  recipes: Recipe[] = [
  //   new Recipe( 'Burger King',
  //     'this is simply Description',
  //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRblETvD__xhT80vHERzZ3IcGHaIUT5Vf3btA&usqp=CAU'
  //     ,[new Ingredient('meat' , 1), new Ingredient('cheese' , 1)]
  // ),
  //   new Recipe('Big Mac', 'this is simply Description', 'https://www.summahealth.org/-/media/project/summahealth/website/page-content/flourish/2_18a_fl_fastfood_400x400.webp?la=en&h=400&w=400&hash=145DC0CF6234A159261389F18A36742A',
  //   [new Ingredient('meat' , 2), new Ingredient('cheese' , 2) , new Ingredient('Potato' , 2)]),
  // ];

  private recipes: Recipe[] = [];

    constructor(private shoppingService:ShoppingListService) { }

  setRecipe(recipes:Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice())
  }


  getRecipe() {
    return this.recipes.slice();
  }
  getRecipeById(index: number) {
     return this.recipes[index];
  }

  AddIngredientToShopping(ingredients:Ingredient[]) {
  this.shoppingService.addIngrediants(ingredients)
  }

  addRecipe(recipe:Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice())
  }

  updateRecipe(index , newRecipe:Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice())

  }

  deleteRecipe(index:number) {
  this.recipes.splice(index , 1)
      this.recipeChanged.next(this.recipes.slice())

  }

}

