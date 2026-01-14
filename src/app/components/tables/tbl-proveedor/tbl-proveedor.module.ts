import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { TblProveedorComponent } from './tbl-proveedor.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {LongPressDirective} from "../../../directives/longpress.directive";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {MatRippleModule} from "@angular/material/core";



@NgModule({
  declarations: [
    TblProveedorComponent,
    LongPressDirective
  ],
  imports: [
    CommonModule,

    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatProgressBarModule,
    TooltipModule,
    MatRippleModule
  ],
  exports: [TblProveedorComponent],
  providers: [],
  bootstrap: [TblProveedorComponent]
})
export class TblProveedorModule { }
