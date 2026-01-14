import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {MatRippleModule} from "@angular/material/core";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {MdlAlmacenComponent} from "./mdl-almacen.component";


@NgModule({
  declarations: [
    MdlAlmacenComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRippleModule,
    TooltipModule
  ],
  exports: [MdlAlmacenComponent],
  providers: [],
  bootstrap: [MdlAlmacenComponent]
})
export class MdlAlmacenModule { }
