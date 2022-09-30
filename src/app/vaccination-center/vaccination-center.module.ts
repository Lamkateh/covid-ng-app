import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonGeneralComponent } from '../button-general/button-general.component';
import { VaccinationCenterComponent } from './vaccination-center.component';

@NgModule({
  declarations: [VaccinationCenterComponent, ButtonGeneralComponent],
  imports: [CommonModule],
  exports: [VaccinationCenterComponent],
})
export class VaccinationCenterModule {}
