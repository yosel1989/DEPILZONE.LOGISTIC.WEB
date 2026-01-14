import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrdenDeCompraComponent} from "./orden-de-compra.component";

const routes: Routes = [{
  path: '',
  component: OrdenDeCompraComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenDeCompraRoutingModule { }
