import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [

    FormsModule,
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
    SharedModule
  ]
})
export class AuthModule { }
