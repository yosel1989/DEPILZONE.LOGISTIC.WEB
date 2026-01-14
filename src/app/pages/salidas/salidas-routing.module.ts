import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SalidasComponent} from "./salidas.component";

const routes: Routes = [{
  path: '',
  component: SalidasComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalidasRoutingModule { }
