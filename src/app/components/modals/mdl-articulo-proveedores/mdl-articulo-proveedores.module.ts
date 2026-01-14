import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {MatRippleModule} from "@angular/material/core";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MdlArticuloProveedoresComponent} from "./mdl-articulo-proveedores.component";
import {MdlBuscarProveedorModule} from "../mdl-buscar-proveedor/mdl-buscar-proveedor.module";


@NgModule({
  declarations: [
    MdlArticuloProveedoresComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRippleModule,
    TooltipModule,
    MatProgressBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MdlBuscarProveedorModule,
    MatRippleModule
  ],
  exports: [MdlArticuloProveedoresComponent],
  providers: [],
  bootstrap: [MdlArticuloProveedoresComponent]
})
export class MdlArticuloProveedoresModule { }
