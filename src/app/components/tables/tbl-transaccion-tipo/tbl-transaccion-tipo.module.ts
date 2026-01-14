import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {TblTransaccionTipoComponent} from "./tbl-transaccion-tipo.component";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {MatRippleModule} from "@angular/material/core";



@NgModule({
  declarations: [
    TblTransaccionTipoComponent
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
  exports: [TblTransaccionTipoComponent],
  providers: [DatePipe],
  bootstrap: [TblTransaccionTipoComponent]
})
export class TblTransaccionTipoModule { }
