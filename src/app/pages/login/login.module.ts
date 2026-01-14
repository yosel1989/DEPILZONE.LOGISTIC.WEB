import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatRippleModule} from "@angular/material/core";


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    MatRippleModule
  ],
  exports: [LoginComponent]
})
export class LoginModule { }
