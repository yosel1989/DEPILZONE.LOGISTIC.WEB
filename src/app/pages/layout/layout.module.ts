import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTabsModule} from "@angular/material/tabs";
import {MatRippleModule} from "@angular/material/core";
import {LayoutComponent} from "./layout.component";
import {LayoutRoutingModule} from "./layout-routing.module";
import {ModalModule} from "ngx-bootstrap/modal";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {MdlCambiarClaveModule} from "../../components/modals/mdl-cambiar-clave/mdl-cambiar-clave.module";
import {SelectSedeModule} from "../../components/selects/select-sede/select-sede.module";

@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,

    MatTabsModule,
    MatRippleModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule,
    MdlCambiarClaveModule,

    SelectSedeModule
  ],
  exports: [LayoutComponent],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class LayoutModule { }
