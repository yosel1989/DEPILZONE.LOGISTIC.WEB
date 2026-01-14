import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {MatRippleModule} from "@angular/material/core";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {MdlAlmacenUbicacionComponent} from "./mdl-almacen-ubicacion.component";


@NgModule({
  declarations: [
    MdlAlmacenUbicacionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRippleModule,
    TooltipModule
  ],
  exports: [MdlAlmacenUbicacionComponent],
  providers: [],
  bootstrap: [MdlAlmacenUbicacionComponent]
})
export class MdlAlmacenUbicacionModule { }
