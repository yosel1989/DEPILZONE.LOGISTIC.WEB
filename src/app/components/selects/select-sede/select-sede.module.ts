import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectSedeComponent } from './select-sede.component';
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";

@NgModule({
  declarations: [
    SelectSedeComponent
  ],
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule
  ],
  exports:[ SelectSedeComponent],
  providers: [],
  bootstrap: [SelectSedeComponent]
})
export class SelectSedeModule { }
