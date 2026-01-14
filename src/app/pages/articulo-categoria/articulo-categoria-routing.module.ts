import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ArticuloCategoriaComponent} from "./articulo-categoria.component";

const routes: Routes = [{
  path: '',
  component: ArticuloCategoriaComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticuloCategoriaRoutingModule { }
