import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VaccinationCenterComponent } from './vaccination-center.component';

@NgModule({
  declarations: [VaccinationCenterComponent],
  imports: [CommonModule],
  exports: [VaccinationCenterComponent],
})
export class VaccinationCenterModule {}
