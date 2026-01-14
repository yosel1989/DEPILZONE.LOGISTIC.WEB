import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {MatRippleModule} from "@angular/material/core";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {MdlProveedorComponent} from "./mdl-proveedor.component";
import {MdlUbigeoModule} from "../mdl-ubigeo/mdl-ubigeo.module";


@NgModule({
  declarations: [
    MdlProveedorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRippleModule,
    TooltipModule,
    MdlUbigeoModule,
  ],
  exports: [MdlProveedorComponent],
  providers: [],
  bootstrap: [MdlProveedorComponent]
})
export class MdlProveedorModule { }
