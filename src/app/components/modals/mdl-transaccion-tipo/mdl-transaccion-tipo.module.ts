import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {MatRippleModule} from "@angular/material/core";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import { MdlTransaccionTipoComponent } from './mdl-transaccion-tipo.component';


@NgModule({
  declarations: [
    MdlTransaccionTipoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRippleModule,
    TooltipModule
  ],
  exports: [MdlTransaccionTipoComponent],
  providers: [],
  bootstrap: [MdlTransaccionTipoComponent]
})
export class MdlTransaccionTipoModule { }
