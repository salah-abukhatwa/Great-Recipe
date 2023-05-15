import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('Burger King','this is simply Description','https://scontent.fist6-3.fna.fbcdn.net/v/t1.6435-9/79264575_565105814055920_5711876113597202432_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=9267fe&_nc_ohc=12A64qpXg5IAX_maGtq&_nc_ht=scontent.fist6-3.fna&oh=00_AfBd51fz4NVoEEWDn1vr8BdahXCFVAgcEPyxw_rk4qNPWA&oe=64896A1F'),
    new Recipe('Big Mac','this is simply Description','https://www.summahealth.org/-/media/project/summahealth/website/page-content/flourish/2_18a_fl_fastfood_400x400.webp?la=en&h=400&w=400&hash=145DC0CF6234A159261389F18A36742A'),
  ];
  @Output() recipeWasSelected = new EventEmitter<Recipe>()
  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe:Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
