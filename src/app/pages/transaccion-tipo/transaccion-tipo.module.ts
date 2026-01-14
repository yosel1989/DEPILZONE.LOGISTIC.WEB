import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TblArticuloCategoriasModule} from "../../components/tables/tbl-articulo-categoria/tbl-articulo-categorias.module";
import {MatRippleModule} from "@angular/material/core";
import {MdlArticuloCategoriaModule} from "../../components/modals/mdl-articulo-categoria/mdl-articulo-categoria.module";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {TransaccionTipoComponent} from "./transaccion-tipo.component";
import {TransaccionTipoRoutingModule} from "./transaccion-tipo-routing.module";
import {TblTransaccionTipoModule} from "../../components/tables/tbl-transaccion-tipo/tbl-transaccion-tipo.module";
import {MdlTransaccionTipoModule} from "../../components/modals/mdl-transaccion-tipo/mdl-transaccion-tipo.module";


@NgModule({
  declarations: [
    TransaccionTipoComponent
  ],
  imports: [
    CommonModule,
    TransaccionTipoRoutingModule,

    TblTransaccionTipoModule,
    MdlTransaccionTipoModule,
    MatRippleModule,
    TooltipModule
  ],
  exports: [TransaccionTipoComponent],
  providers: [],
  bootstrap: [TransaccionTipoComponent]
})
export class TransaccionTipoModule { }
