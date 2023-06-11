import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;


  constructor(private recipeService: RecipeService, private route: ActivatedRoute , private router:Router) {


   }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']
         this.recipe = this.recipeService.getRecipeById(this.id);
      }
    );

    this.recipe = this.recipeService.getRecipeById(this.id);
  }
  onAddToShoppingList() {
    this.recipeService.AddIngredientToShopping(this.recipe.ingredients);
  const dropdownToggle = document.querySelector('.dropdown-toggle');
    if (dropdownToggle) {
      dropdownToggle.dispatchEvent(new Event('click'));
    }

  }

  oneditRecipe() {
  this.router.navigate(['edit'] , {relativeTo :this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
     this.router.navigate(['../'] , {relativeTo:this.route})
  }

}
