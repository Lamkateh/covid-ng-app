import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenterManagementPageComponent } from './center-management-page/center-management-page.component';
import { CentersManagementPageComponent } from './centers-management-page/centers-management-page.component';
import { ConfigurationPageComponent } from './configuration-page/configuration-page.component';
import { HomePublicPageComponent } from './home-public-page/home-public-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SchedulePageComponent } from './schedule-page/schedule-page.component';
import { VaccinationCenterComponent } from './vaccination-center/vaccination-center.component';

const routes: Routes = [
  { path: 'centers', component: HomePublicPageComponent },
  { path: 'centers/:id', component: VaccinationCenterComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'management/centers', component: CentersManagementPageComponent },
  { path: 'management/center', component: CenterManagementPageComponent },
  { path: 'schedule', component: SchedulePageComponent },
  { path: 'configuration', component: ConfigurationPageComponent },
  { path: '', redirectTo: '/centers', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
