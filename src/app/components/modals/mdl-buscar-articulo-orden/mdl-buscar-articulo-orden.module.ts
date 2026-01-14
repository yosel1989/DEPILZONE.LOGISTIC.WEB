import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {MatRippleModule} from "@angular/material/core";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import { MdlBuscarArticuloOrdenComponent } from './mdl-buscar-articulo-orden.component';

@NgModule({
  declarations: [
    MdlBuscarArticuloOrdenComponent
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
  exports: [MdlBuscarArticuloOrdenComponent],
  providers: [],
  bootstrap: [MdlBuscarArticuloOrdenComponent]
})
export class MdlBuscarArticuloOrdenModule { }
