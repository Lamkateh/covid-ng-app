import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CenterInformationsModule } from './components/centers/center-informations/center-informations.module';
import { CentersListComponent } from './components/centers/centers-list/centers-list.component';
import { CentersListItemComponent } from './components/centers/centers-list-item/centers-list-item.component';
import { CenterPageComponent } from './components/centers/center-page/center-page.component';
import { HomePublicPageComponent } from './components/home-public-page/home-public-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared-modules/shared.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HeaderComponent } from './components/header/header.component';
import { CentersManagementPageComponent } from './components/centers/centers-management-page/centers-management-page.component';
import { CenterManagementPageComponent } from './components/centers/center-management-page/center-management-page.component';
import { SchedulePageComponent } from './components/schedule-page/schedule-page.component';
import { ConfigurationPageComponent } from './components/configuration-page/configuration-page.component';
import { AppointmentPreviewComponent } from './components/appointment-preview/appointment-preview.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { UsersListItemComponent } from './components/users/users-list-item/users-list-item.component';
import { AppointmentDialogComponent } from './components/dialogs/appointment-dialog/appointment-dialog.component';
import { CenterManagementDialogComponent } from './components/dialogs/center-management-dialog/center-management-dialog.component';
import { UsersManagementDialogComponent } from './components/dialogs/users-management-dialog/users-management-dialog.component';
import { UserManagementDialogComponent } from './components/dialogs/user-management-dialog/user-management-dialog.component';
import { DeleteDialogComponent } from './components/dialogs/delete-dialog/delete-dialog.component';
import { httpInterceptorProviders } from './http-interceptors';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";

@NgModule({
  declarations: [
    AppComponent,
    CentersListComponent,
    CentersListItemComponent,
    CenterPageComponent,
    HomePublicPageComponent,
    LoginPageComponent,
    HeaderComponent,
    CentersManagementPageComponent,
    CenterManagementPageComponent,
    SchedulePageComponent,
    ConfigurationPageComponent,
    AppointmentPreviewComponent,
    TimetableComponent,
    UsersListComponent,
    UsersListItemComponent,
    AppointmentDialogComponent,
    CenterManagementDialogComponent,
    UserManagementDialogComponent,
    UsersManagementDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    MatDialogModule,
    CenterInformationsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    NgxMatSelectSearchModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(localeFr, "fr");
  }
}
