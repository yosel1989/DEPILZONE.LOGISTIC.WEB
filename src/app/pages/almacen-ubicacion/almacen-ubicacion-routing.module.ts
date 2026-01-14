import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AlmacenUbicacionComponent} from "./almacen-ubicacion.component";

const routes: Routes = [{
  path: '',
  component: AlmacenUbicacionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenUbicacionRoutingModule { }
