import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DropdownToggleDirective } from './dropdown.directive';



@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownToggleDirective],
  imports: [
    CommonModule
  ],
  exports: [
      AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownToggleDirective,
    CommonModule
  ]
})
export class SharedModule { }
