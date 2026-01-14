import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatRippleModule} from "@angular/material/core";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {TblTransaccionTipoModule} from "../../components/tables/tbl-transaccion-tipo/tbl-transaccion-tipo.module";
import {TransaccionComponent} from "./transaccion.component";
import {TransaccionRoutingModule} from "./transaccion-routing.module";
import {MdlTransaccionModule} from "../../components/modals/mdl-transaccion/mdl-transaccion.module";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {TblTransaccionModule} from "../../components/tables/tbl-transaccion/tbl-transaccion.module";


@NgModule({
  declarations: [
    TransaccionComponent
  ],
  imports: [
    CommonModule,
    TransaccionRoutingModule,

    TblTransaccionModule,
    MdlTransaccionModule,
    MatRippleModule,
    TooltipModule,
    BsDropdownModule
  ],
  exports: [TransaccionComponent],
  providers: [],
  bootstrap: [TransaccionComponent]
})
export class TransaccionModule { }
