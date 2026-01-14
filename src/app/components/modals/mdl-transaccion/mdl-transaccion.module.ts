import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {MatRippleModule} from "@angular/material/core";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {MdlTransaccionComponent} from "./mdl-transaccion.component";
import {MatTableModule} from "@angular/material/table";
import {MdlBuscarArticuloStockModule} from "../mdl-buscar-articulo-stock/mdl-buscar-articulo-stock.module";


@NgModule({
  declarations: [
    MdlTransaccionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRippleModule,
    TooltipModule,

    MatTableModule,
    MdlBuscarArticuloStockModule
  ],
  exports: [MdlTransaccionComponent],
  providers: [],
  bootstrap: [MdlTransaccionComponent]
})
export class MdlTransaccionModule { }
