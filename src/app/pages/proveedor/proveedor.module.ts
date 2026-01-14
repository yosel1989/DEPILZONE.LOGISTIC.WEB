import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {ProveedorComponent} from "./proveedor.component";
import {ProveedorRoutingModule} from "./proveedor-routing.module";
import {TblProveedorModule} from "../../components/tables/tbl-proveedor/tbl-proveedor.module";
import {MdlProveedorModule} from "../../components/modals/mdl-proveedor/mdl-proveedor.module";
import {MatRippleModule} from "@angular/material/core";


@NgModule({
  declarations: [
    ProveedorComponent
  ],
    imports: [
        CommonModule,
        ProveedorRoutingModule,

        TblProveedorModule,
        MdlProveedorModule,
        BsDropdownModule,
        TooltipModule,
        MatRippleModule
    ],
  exports: [ProveedorComponent],
  providers: [],
  bootstrap: [ProveedorComponent]
})
export class ProveedorModule { }
