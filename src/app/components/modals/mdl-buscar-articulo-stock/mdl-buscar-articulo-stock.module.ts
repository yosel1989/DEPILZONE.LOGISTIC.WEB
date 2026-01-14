import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {MatRippleModule} from "@angular/material/core";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { MdlBuscarArticuloStockComponent } from './mdl-buscar-articulo-stock.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [
    MdlBuscarArticuloStockComponent
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
  exports: [MdlBuscarArticuloStockComponent],
  providers: [],
  bootstrap: [MdlBuscarArticuloStockComponent]
})
export class MdlBuscarArticuloStockModule { }
