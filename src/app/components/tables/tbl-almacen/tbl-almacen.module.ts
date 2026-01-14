import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { TblAlmacenComponent } from './tbl-almacen.component';
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {MatRippleModule} from "@angular/material/core";



@NgModule({
  declarations: [
    TblAlmacenComponent
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
  exports: [TblAlmacenComponent],
  providers: [DatePipe],
  bootstrap: [TblAlmacenComponent]
})
export class TblAlmacenModule { }
