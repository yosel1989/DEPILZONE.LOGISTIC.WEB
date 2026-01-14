import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {MatRippleModule} from "@angular/material/core";
import {AlmacenUbicacionComponent} from "./almacen-ubicacion.component";
import {AlmacenUbicacionRoutingModule} from "./almacen-ubicacion-routing.module";
import {TblAlmacenUbicacionModule} from "../../components/tables/tbl-almacen-ubicacion/tbl-almacen-ubicacion.module";
import {MdlAlmacenUbicacionModule} from "../../components/modals/mdl-almacen-ubicacion/mdl-almacen-ubicacion.module";


@NgModule({
  declarations: [
    AlmacenUbicacionComponent
  ],
    imports: [
        CommonModule,
        AlmacenUbicacionRoutingModule,

        MdlAlmacenUbicacionModule,
        TblAlmacenUbicacionModule,
        BsDropdownModule,
        TooltipModule,
        MatRippleModule
    ],
  exports: [AlmacenUbicacionComponent],
  providers: [],
  bootstrap: [AlmacenUbicacionComponent]
})
export class AlmacenUbicacionModule { }
