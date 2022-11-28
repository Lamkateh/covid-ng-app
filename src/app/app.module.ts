import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { VaccinationCenterListComponent } from "./components/vaccination/vaccination-center-list/vaccination-center-list.component";
import { VaccinationCenterListItemComponent } from "./components/vaccination/vaccination-center-list-item/vaccination-center-list-item.component";
import { HomePublicPageComponent } from "./components/home-public-page/home-public-page.component";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { VaccinationCenterModule } from "./components/vaccination/vaccination-center/vaccination-center.module";
import { SharedModule } from "./shared-modules/shared.module";
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { HeaderComponent } from "./components/header/header.component";
import { CentersManagementPageComponent } from "./components/centers/centers-management-page/centers-management-page.component";
import { CenterManagementPageComponent } from "./components/centers/center-management-page/center-management-page.component";
import { SchedulePageComponent } from "./components/schedule-page/schedule-page.component";
import { ConfigurationPageComponent } from "./components/configuration-page/configuration-page.component";
import { AppointmentPreviewComponent } from "./components/appointment-preview/appointment-preview.component";
import { TimetableComponent } from "./components/timetable/timetable.component";
import { VaccinationCenterPageComponent } from "./components/vaccination/vaccination-center-page/vaccination-center-page.component";
import { UsersListComponent } from "./components/users/users-list/users-list.component";
import { UsersListItemComponent } from "./components/users/users-list-item/users-list-item.component";
import { AppointmentDialogComponent } from "./components/dialogs/appointment-dialog/appointment-dialog.component";
import { CenterManagementDialogComponent } from "./components/dialogs/center-management-dialog/center-management-dialog.component";
import { UsersManagementDialogComponent } from "./components/dialogs/users-management-dialog/users-management-dialog.component";
import { UserManagementDialogComponent } from "./components/dialogs/user-management-dialog/user-management-dialog.component";
import { DeleteDialogComponent } from "./components/dialogs/delete-dialog/delete-dialog.component";
import { httpInterceptorProviders } from "./http-interceptors";
import { MatSnackBarModule } from "@angular/material/snack-bar";

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    VaccinationCenterModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
