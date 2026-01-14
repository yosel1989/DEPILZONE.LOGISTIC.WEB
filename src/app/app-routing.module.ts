import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {AuthActivateGuard} from "./guards/auth-activate.guard";
import {LogoutGuard} from "./guards/logout.guard";
import {LogoutActivateGuard} from "./guards/logout-activate.guard";

const routes: Routes = [
  {
    path: 'inicio',
    loadChildren: () => import('./pages/layout/layout.module').then(m => m.LayoutModule),
    canLoad: [AuthGuard],
    canActivate: [AuthActivateGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    canLoad: [LogoutGuard],
    canActivate: [LogoutActivateGuard]
  },
  {path:'**', redirectTo:'inicio', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
