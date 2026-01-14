import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {MatRippleModule} from "@angular/material/core";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {MdlArticuloCategoriaComponent} from "./mdl-articulo-categoria.component";


@NgModule({
  declarations: [
    MdlArticuloCategoriaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRippleModule,
    TooltipModule
  ],
  exports: [MdlArticuloCategoriaComponent],
  providers: [],
  bootstrap: [MdlArticuloCategoriaComponent]
})
export class MdlArticuloCategoriaModule { }
