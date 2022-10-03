import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ButtonComponent, InputComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [MaterialModule, ButtonComponent, InputComponent, FormsModule],
})
export class SharedModule { }
