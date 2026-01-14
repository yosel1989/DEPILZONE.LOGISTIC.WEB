import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./layout.component";
import {AlmacenUbicacionModule} from "../almacen-ubicacion/almacen-ubicacion.module";

const routes: Routes = [{
  path:'',
  component: LayoutComponent,
  children: [
    { path: '', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)},
    { path: 'articulo', loadChildren: () => import('../articulo/articulo.module').then(m => m.ArticuloModule)},
    { path: 'articulo/categoria', loadChildren: () => import('../articulo-categoria/articulo-categoria.module').then(m => m.ArticuloCategoriaModule)},
    { path: 'articulo/unidad-medida', loadChildren: () => import('../unidad-medida/unidad-medida.module').then(m => m.UnidadMedidaModule)},
    { path: 'articulo/stock', loadChildren: () => import('../articulo-stock/articulo-stock.module').then(m => m.ArticuloStockModule)},
    { path: 'proveedor', loadChildren: () => import('../proveedor/proveedor.module').then(m => m.ProveedorModule)},
    { path: 'almacen', loadChildren: () => import('../almacen/almacen.module').then(m => m.AlmacenModule)},
    { path: 'almacen/ubicacion', loadChildren: () => import('../almacen-ubicacion/almacen-ubicacion.module').then(m => m.AlmacenUbicacionModule)},
    { path: 'entradas', loadChildren: () => import('../entradas/entradas.module').then(m => m.EntradasModule)},
    { path: 'transaccion', loadChildren: () => import('../transaccion/transaccion.module').then(m => m.TransaccionModule)},
    { path: 'transaccion/tipos', loadChildren: () => import('../transaccion-tipo/transaccion-tipo.module').then(m => m.TransaccionTipoModule)},
    { path: 'orden-de-compra', loadChildren: () => import('../orden-de-compra/orden-de-compra.module').then(m => m.OrdenDeCompraModule)},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
