import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatRippleModule} from "@angular/material/core";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,

    MatTabsModule,
    MatRippleModule
  ],
  exports: [DashboardComponent],
  providers: [],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
