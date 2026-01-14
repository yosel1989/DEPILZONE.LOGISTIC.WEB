import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {MdlAlmacenModule} from "../../components/modals/mdl-almacen/mdl-almacen.module";
import {TblAlmacenModule} from "../../components/tables/tbl-almacen/tbl-almacen.module";
import {SalidasRoutingModule} from "./salidas-routing.module";
import {SalidasComponent} from "./salidas.component";


@NgModule({
  declarations: [
    SalidasComponent
  ],
    imports: [
        CommonModule,
        SalidasRoutingModule,

        MdlAlmacenModule,
        TblAlmacenModule,
        BsDropdownModule,
        TooltipModule
    ],
  exports: [SalidasComponent],
  providers: [],
  bootstrap: [SalidasComponent]
})
export class SalidasModule { }
