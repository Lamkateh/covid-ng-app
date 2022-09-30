import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ButtonGeneralComponent } from '../button-general/button-general.component';
import { InputComponent } from '../input/input.component';

@NgModule({
  declarations: [ButtonGeneralComponent, InputComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule, ButtonGeneralComponent, InputComponent],
})
export class SharedModule {}
