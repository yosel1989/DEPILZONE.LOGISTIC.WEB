import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {TblArticuloComponent} from "./tbl-articulo.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {MatRippleModule} from "@angular/material/core";
import {MdlArticuloProveedoresModule} from "../../modals/mdl-articulo-proveedores/mdl-articulo-proveedores.module";



@NgModule({
  declarations: [
    TblArticuloComponent
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
  exports: [TblArticuloComponent],
  providers: [],
  bootstrap: [TblArticuloComponent]
})
export class TblArticuloModule { }
