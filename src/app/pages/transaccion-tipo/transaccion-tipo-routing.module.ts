import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TransaccionTipoComponent} from "./transaccion-tipo.component";

const routes: Routes = [{
  path: '',
  component: TransaccionTipoComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransaccionTipoRoutingModule { }
