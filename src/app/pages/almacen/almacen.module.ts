import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {AlmacenComponent} from "./almacen.component";
import {AlmacenRoutingModule} from "./almacen-routing.module";
import {MdlAlmacenModule} from "../../components/modals/mdl-almacen/mdl-almacen.module";
import {TblAlmacenModule} from "../../components/tables/tbl-almacen/tbl-almacen.module";
import {MatRippleModule} from "@angular/material/core";


@NgModule({
  declarations: [
    AlmacenComponent
  ],
    imports: [
        CommonModule,
        AlmacenRoutingModule,

        MdlAlmacenModule,
        TblAlmacenModule,
        BsDropdownModule,
        TooltipModule,
        MatRippleModule
    ],
  exports: [AlmacenComponent],
  providers: [],
  bootstrap: [AlmacenComponent]
})
export class AlmacenModule { }
