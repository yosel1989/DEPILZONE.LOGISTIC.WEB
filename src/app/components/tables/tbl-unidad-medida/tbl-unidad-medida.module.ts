import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { TblUnidadMedidaComponent } from './tbl-unidad-medida.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {AngularResizeEventModule} from "angular-resize-event";
import {MatRippleModule} from "@angular/material/core";
import {TooltipModule} from "ngx-bootstrap/tooltip";



@NgModule({
  declarations: [
    TblUnidadMedidaComponent
  ],
  imports: [
    CommonModule,

    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatProgressBarModule,

    AngularResizeEventModule,
    MatRippleModule,
    TooltipModule
  ],
  exports: [TblUnidadMedidaComponent],
  providers: [],
  bootstrap: [TblUnidadMedidaComponent]
})
export class TblUnidadMedidaModule { }
