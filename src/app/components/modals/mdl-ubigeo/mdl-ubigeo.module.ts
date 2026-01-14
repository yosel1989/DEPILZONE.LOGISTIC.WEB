import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {MatRippleModule} from "@angular/material/core";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {NgSelect2Module} from "ng-select2";
import { MdlUbigeoComponent } from './mdl-ubigeo.component';


@NgModule({
  declarations: [
    MdlUbigeoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRippleModule,
    TooltipModule,
    NgSelect2Module
  ],
  exports: [MdlUbigeoComponent],
  providers: [],
  bootstrap: [MdlUbigeoComponent]
})
export class MdlUbigeoModule { }
