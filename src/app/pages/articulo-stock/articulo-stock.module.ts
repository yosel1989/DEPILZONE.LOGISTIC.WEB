import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatRippleModule} from "@angular/material/core";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {ArticuloStockRoutingModule} from "./articulo-stock-routing.module";
import {ArticuloStockComponent} from "./articulo-stock.component";
import {TblArticuloStockModule} from "../../components/tables/tbl-articulo-stock/tbl-articulo-stock.module";
import {MdlArticuloStockModule} from "../../components/modals/mdl-articulo-stock/mdl-articulo-stock.module";


@NgModule({
  declarations: [
    ArticuloStockComponent
  ],
  imports: [
    CommonModule,
    ArticuloStockRoutingModule,

    TblArticuloStockModule,
    MdlArticuloStockModule,
    MatRippleModule,
    TooltipModule
  ],
  exports: [ArticuloStockComponent],
  providers: [],
  bootstrap: [ArticuloStockComponent]
})
export class ArticuloStockModule { }
