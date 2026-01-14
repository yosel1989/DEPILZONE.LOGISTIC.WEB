import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticuloRoutingModule } from './articulo-routing.module';
import { ArticuloComponent } from './articulo.component';
import {TblArticuloModule} from "../../components/tables/tbl-articulo/tbl-articulo.module";
import {MdlArticuloModule} from "../../components/modals/mdl-articulo/mdl-articulo.module";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {MatRippleModule} from "@angular/material/core";


@NgModule({
  declarations: [
    ArticuloComponent
  ],
    imports: [
        CommonModule,
        ArticuloRoutingModule,

        TblArticuloModule,
        MdlArticuloModule,
        BsDropdownModule,
        TooltipModule,
        MatRippleModule
    ],
  exports: [ArticuloComponent],
  providers: [],
  bootstrap: [ArticuloComponent]
})
export class ArticuloModule { }
