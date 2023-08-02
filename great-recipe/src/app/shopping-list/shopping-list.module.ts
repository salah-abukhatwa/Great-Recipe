import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,

  ],
  imports: [
    FormsModule,
    RouterModule.forChild([
        { path: '', component: ShoppingListComponent },

    ]),
    SharedModule
  ]
})
export class ShoppingListModule { }
