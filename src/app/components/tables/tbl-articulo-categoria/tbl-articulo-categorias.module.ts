import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { TblArticuloCategoriaComponent } from './tbl-articulo-categoria.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {MatRippleModule} from "@angular/material/core";



@NgModule({
  declarations: [
    TblArticuloCategoriaComponent
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
  exports: [TblArticuloCategoriaComponent],
  providers: [DatePipe],
  bootstrap: [TblArticuloCategoriaComponent]
})
export class TblArticuloCategoriasModule { }
