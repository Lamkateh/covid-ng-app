import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VaccinationCenterComponent } from './vaccination-center/vaccination-center.component';
import { VaccinationCenterListComponent } from './vaccination-center-list/vaccination-center-list.component';

import { ButtonGeneralComponent } from './button-general/button-general.component';
import { VaccinationCenterModule } from './vaccination-center/vaccination-center.module';

@NgModule({
  declarations: [AppComponent, VaccinationCenterListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    VaccinationCenterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
