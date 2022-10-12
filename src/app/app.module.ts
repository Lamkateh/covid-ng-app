import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VaccinationCenterListComponent } from './components/vaccination-center-list/vaccination-center-list.component';
import { VaccinationCenterListItemComponent } from './components/vaccination-center-list-item/vaccination-center-list-item.component';
import { HomePublicPageComponent } from './components/home-public-page/home-public-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { VaccinationCenterModule } from './components/vaccination-center/vaccination-center.module';
import { SharedModule } from './shared-modules/shared.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HeaderComponent } from './components/header/header.component';
import { CentersManagementPageComponent } from './components/centers-management-page/centers-management-page.component';
import { CenterManagementPageComponent } from './components/center-management-page/center-management-page.component';
import { SchedulePageComponent } from './components/schedule-page/schedule-page.component';
import { ConfigurationPageComponent } from './components/configuration-page/configuration-page.component';
import { AppointmentPreviewComponent } from './components/appointment-preview/appointment-preview.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import { VaccinationCenterPageComponent } from './components/vaccination-center-page/vaccination-center-page.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersListItemComponent } from './components/users-list-item/users-list-item.component';
import { AppointmentDialogComponent } from './components/appointment-dialog/appointment-dialog.component';
import { CenterManagementDialogComponent } from './components/center-management-dialog/center-management-dialog.component';
import { UsersManagementDialogComponent } from './components/users-management-dialog/users-management-dialog.component';
import { UserManagementDialogComponent } from './components/user-management-dialog/user-management-dialog.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { SelectComponent } from './components/select/select.component';
import { httpInterceptorProviders } from './http-interceptors';

@NgModule({
  declarations: [
    AppComponent,
    VaccinationCenterListComponent,
    VaccinationCenterListItemComponent,
    HomePublicPageComponent,
    LoginPageComponent,
    HeaderComponent,
    CentersManagementPageComponent,
    CenterManagementPageComponent,
    SchedulePageComponent,
    ConfigurationPageComponent,
    AppointmentPreviewComponent,
    VaccinationCenterPageComponent,
    TimetableComponent,
    UsersListComponent,
    UsersListItemComponent,
    AppointmentDialogComponent,
    CenterManagementDialogComponent,
    UsersManagementDialogComponent,
    UserManagementDialogComponent,
    DeleteDialogComponent,
    SelectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    VaccinationCenterModule,
    MatDialogModule,
    BrowserAnimationsModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
