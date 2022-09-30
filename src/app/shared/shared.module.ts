import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';

@NgModule({
  declarations: [ButtonComponent, InputComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule, ButtonComponent, InputComponent],
})
export class SharedModule {}
