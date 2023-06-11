import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredirnt.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  edithMood = false;
  editedItemIndex: number;
  editedItem: Ingredient;


  constructor(private shoppingService: ShoppingListService) {


  }

  ngOnInit(): void {


    this.subscription = this.shoppingService.startEditing.subscribe(
      (index: number) => {

        this.editedItemIndex = index;
        this.edithMood = true;
        this.editedItem = this.shoppingService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
  );
  }


  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredint = new Ingredient(value.name, value.amount);
    if (this.edithMood) {
      this.shoppingService.updateIngrediant(this.editedItemIndex , newIngredint)
    } else {
          this.shoppingService.addIngredient(newIngredint);

    }
 this.edithMood = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.edithMood = false;
  }

  onDelete() {
        this.shoppingService.deleteIngrediant(this.editedItemIndex)
        this.onClear();
  }

    ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



}
