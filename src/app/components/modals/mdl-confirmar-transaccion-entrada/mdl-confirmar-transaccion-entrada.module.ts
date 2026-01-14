import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {MatRippleModule} from "@angular/material/core";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {MatTableModule} from "@angular/material/table";
import {MdlBuscarArticuloStockModule} from "../mdl-buscar-articulo-stock/mdl-buscar-articulo-stock.module";
import {MdlConfirmarTransaccionEntradaComponent} from "./mdl-confirmar-transaccion-entrada.component";


@NgModule({
  declarations: [
    MdlConfirmarTransaccionEntradaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRippleModule,
    TooltipModule,

    MatTableModule,
    MdlBuscarArticuloStockModule
  ],
  exports: [MdlConfirmarTransaccionEntradaComponent],
  providers: [],
  bootstrap: [MdlConfirmarTransaccionEntradaComponent]
})
export class MdlConfirmarTransaccionEntradaModule { }
