import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadMedidaComponent } from './unidad-medida.component';
import { UnidadMedidaRoutingModule } from './unidad-medida-routing.module';
import {TblUnidadMedidaModule} from "../../components/tables/tbl-unidad-medida/tbl-unidad-medida.module";
import {MdlUnidadMedidaModule} from "../../components/modals/mdl-unidad-medida/mdl-unidad-medida.module";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {MatRippleModule} from "@angular/material/core";



@NgModule({
  declarations: [
    UnidadMedidaComponent
  ],
  imports: [
    CommonModule,
    UnidadMedidaRoutingModule,

    TblUnidadMedidaModule,
    MdlUnidadMedidaModule,
    TooltipModule,
    MatRippleModule
  ],
  exports: [UnidadMedidaComponent],
  providers: [],
  bootstrap: [UnidadMedidaComponent]
})
export class UnidadMedidaModule { }
