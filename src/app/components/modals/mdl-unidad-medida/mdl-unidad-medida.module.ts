import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {MatRippleModule} from "@angular/material/core";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {MdlUnidadMedidaComponent} from "./mdl-unidad-medida.component";


@NgModule({
  declarations: [
    MdlUnidadMedidaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRippleModule,
    TooltipModule
  ],
  exports: [MdlUnidadMedidaComponent],
  providers: [],
  bootstrap: [MdlUnidadMedidaComponent]
})
export class MdlUnidadMedidaModule { }
