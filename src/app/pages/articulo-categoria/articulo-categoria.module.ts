import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticuloCategoriaRoutingModule } from './articulo-categoria-routing.module';
import { ArticuloCategoriaComponent } from './articulo-categoria.component';
import {TblArticuloCategoriasModule} from "../../components/tables/tbl-articulo-categoria/tbl-articulo-categorias.module";
import {MatRippleModule} from "@angular/material/core";
import {MdlArticuloCategoriaModule} from "../../components/modals/mdl-articulo-categoria/mdl-articulo-categoria.module";
import {TooltipModule} from "ngx-bootstrap/tooltip";


@NgModule({
  declarations: [
    ArticuloCategoriaComponent
  ],
  imports: [
    CommonModule,
    ArticuloCategoriaRoutingModule,

    TblArticuloCategoriasModule,
    MdlArticuloCategoriaModule,
    MatRippleModule,
    TooltipModule
  ],
  exports: [ArticuloCategoriaComponent],
  providers: [],
  bootstrap: [ArticuloCategoriaComponent]
})
export class ArticuloCategoriaModule { }
