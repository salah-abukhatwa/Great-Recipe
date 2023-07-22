import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService , private authService:AuthService) { }

    storeRecipes(){
      const recipes = this.recipeService.getRecipe();
      this.http.put('https://great-recipe-556d4-default-rtdb.firebaseio.com/recipe.json', recipes).subscribe(
        response =>{ console.log(response)}
      )
    }

  fetchRecipes() {

      return this.http.get<Recipe[]>('https://great-recipe-556d4-default-rtdb.firebaseio.com/recipe.json')
 .pipe(
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    tap(recipes => {
      this.recipeService.setRecipe(recipes);
    })
  );
}








}
