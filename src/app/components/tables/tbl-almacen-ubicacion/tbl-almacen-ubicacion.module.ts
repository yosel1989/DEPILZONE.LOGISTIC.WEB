import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {MatRippleModule} from "@angular/material/core";
import {MdlArticuloProveedoresModule} from "../../modals/mdl-articulo-proveedores/mdl-articulo-proveedores.module";
import {TblAlmacenUbicacionComponent} from "./tbl-almacen-ubicacion.component";



@NgModule({
  declarations: [
    TblAlmacenUbicacionComponent
  ],
  imports: [
    CommonModule,

    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatProgressBarModule,
    TooltipModule,
    MatRippleModule,
    MdlArticuloProveedoresModule
  ],
  exports: [TblAlmacenUbicacionComponent],
  providers: [],
  bootstrap: [TblAlmacenUbicacionComponent]
})
export class TblAlmacenUbicacionModule { }
