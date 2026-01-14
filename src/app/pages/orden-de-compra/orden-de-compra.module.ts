import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatRippleModule} from "@angular/material/core";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {OrdenDeCompraComponent} from "./orden-de-compra.component";
import {OrdenDeCompraRoutingModule} from "./orden-de-compra-routing.module";
import {TblOrdenCompraModule} from "../../components/tables/tbl-orden-compra/tbl-orden-compra.module";
import {MdlOrdenCompraModule} from "../../components/modals/mdl-orden-compra/mdl-orden-compra.module";


@NgModule({
  declarations: [
    OrdenDeCompraComponent
  ],
  imports: [
    CommonModule,
    OrdenDeCompraRoutingModule,

    TblOrdenCompraModule,
    MdlOrdenCompraModule,
    MatRippleModule,
    TooltipModule,
    BsDropdownModule
  ],
  exports: [OrdenDeCompraComponent],
  providers: [],
  bootstrap: [OrdenDeCompraComponent]
})
export class OrdenDeCompraModule { }
