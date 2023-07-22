import { Component, OnInit , OnDestroy} from '@angular/core';
import { Ingredient } from '../shared/ingredirnt.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],

})
export class ShoppingListComponent implements OnInit ,  OnDestroy {


  ingredients: Ingredient[];
  private igChangedSub: Subscription;
  constructor(private shoppingServirec:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingServirec.getIngrediants();
   this.igChangedSub = this.shoppingServirec.ingredientChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );

  }



  onEdithItem(index:number) {
    this.shoppingServirec.startEditing.next(index);
    console.log(index);

  }

   ngOnDestroy() {
    this.igChangedSub.unsubscribe();
  }

}
