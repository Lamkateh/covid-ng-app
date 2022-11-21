import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from "@angular/material/input";

@NgModule({
  exports: [
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
  ]
})
export class MaterialModule { }
