import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {MatRippleModule} from "@angular/material/core";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {MatTableModule} from "@angular/material/table";
import {MdlOrdenCompraComponent} from "./mdl-orden-compra.component";
import {
  MdlBuscarArticuloOrdenModule
} from '../mdl-buscar-articulo-orden/mdl-buscar-articulo-orden.module';


@NgModule({
  declarations: [
    MdlOrdenCompraComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRippleModule,
    TooltipModule,

    MatTableModule,
    MdlBuscarArticuloOrdenModule
  ],
  exports: [MdlOrdenCompraComponent],
  providers: [],
  bootstrap: [MdlOrdenCompraComponent]
})
export class MdlOrdenCompraModule { }
