import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlArticuloComponent } from './mdl-articulo.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatRippleModule} from "@angular/material/core";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {NgSelect2Module} from "ng-select2";


@NgModule({
  declarations: [
    MdlArticuloComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRippleModule,
    TooltipModule,
    NgSelect2Module
  ],
  exports: [MdlArticuloComponent],
  providers: [],
  bootstrap: [MdlArticuloComponent]
})
export class MdlArticuloModule { }
