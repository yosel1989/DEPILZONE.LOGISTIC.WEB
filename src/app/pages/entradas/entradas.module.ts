import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {MdlAlmacenModule} from "../../components/modals/mdl-almacen/mdl-almacen.module";
import {TblAlmacenModule} from "../../components/tables/tbl-almacen/tbl-almacen.module";
import {EntradasRoutingModule} from "./entradas-routing.module";
import {EntradasComponent} from "./entradas.component";


@NgModule({
  declarations: [
    EntradasComponent
  ],
    imports: [
        CommonModule,
        EntradasRoutingModule,

        MdlAlmacenModule,
        TblAlmacenModule,
        BsDropdownModule,
        TooltipModule
    ],
  exports: [EntradasComponent],
  providers: [],
  bootstrap: [EntradasComponent]
})
export class EntradasModule { }
