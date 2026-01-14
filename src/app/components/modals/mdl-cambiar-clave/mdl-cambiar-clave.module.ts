import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {MatRippleModule} from "@angular/material/core";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {MdlCambiarClaveComponent} from "./mdl-cambiar-clave.component";


@NgModule({
  declarations: [
    MdlCambiarClaveComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRippleModule,
    TooltipModule
  ],
  exports: [MdlCambiarClaveComponent],
  providers: [],
  bootstrap: [MdlCambiarClaveComponent]
})
export class MdlCambiarClaveModule { }
