import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {MatRippleModule} from "@angular/material/core";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import { MdlArticuloStockComponent } from './mdl-articulo-stock.component';


@NgModule({
  declarations: [
    MdlArticuloStockComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRippleModule,
    TooltipModule
  ],
  exports: [MdlArticuloStockComponent],
  providers: [],
  bootstrap: [MdlArticuloStockComponent]
})
export class MdlArticuloStockModule { }
