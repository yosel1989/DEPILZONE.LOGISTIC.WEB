import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {MatRippleModule} from "@angular/material/core";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MdlBuscarProveedorComponent} from "./mdl-buscar-proveedor.component";


@NgModule({
  declarations: [
    MdlBuscarProveedorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRippleModule,
    TooltipModule,
    MatProgressBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  exports: [MdlBuscarProveedorComponent],
  providers: [],
  bootstrap: [MdlBuscarProveedorComponent]
})
export class MdlBuscarProveedorModule { }
