import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CenterInformationsComponent } from './center-informations.component';
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";

@NgModule({
  declarations: [CenterInformationsComponent],
  imports: [CommonModule, NgxSkeletonLoaderModule],
  exports: [CenterInformationsComponent],
})
export class CenterInformationsModule { }