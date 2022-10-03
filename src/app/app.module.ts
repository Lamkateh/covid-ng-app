import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VaccinationCenterListComponent } from './vaccination-center-list/vaccination-center-list.component';
import { VaccinationCenterListItemComponent } from './vaccination-center-list-item/vaccination-center-list-item.component';
import { HomePublicPageComponent } from './home-public-page/home-public-page.component';
import { FormsModule } from '@angular/forms';

import { VaccinationCenterModule } from './vaccination-center/vaccination-center.module';
import { SharedModule } from './shared/shared.module';
import { TimetableComponent } from './timetable/timetable.component';
import { VaccinationCenterPageComponent } from './vaccination-center-page/vaccination-center-page.component';

@NgModule({
  declarations: [
    AppComponent,
    VaccinationCenterListComponent,
    VaccinationCenterListItemComponent,
    HomePublicPageComponent,
    TimetableComponent,
    VaccinationCenterPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    VaccinationCenterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
