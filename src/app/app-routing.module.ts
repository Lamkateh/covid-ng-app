import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenterManagementPageComponent } from './components/centers/center-management-page/center-management-page.component';
import { CentersManagementPageComponent } from './components/centers/centers-management-page/centers-management-page.component';
import { ConfigurationPageComponent } from './components/configuration-page/configuration-page.component';
import { HomePublicPageComponent } from './components/home-public-page/home-public-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SchedulePageComponent } from './components/schedule-page/schedule-page.component';
import { CenterPageComponent } from './components/centers/center-page/center-page.component';

const routes: Routes = [
  { path: 'centers', component: HomePublicPageComponent },
  { path: 'centers/:id', component: CenterPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'management/centers', component: CentersManagementPageComponent },
  { path: 'management/centers/:id', component: CenterManagementPageComponent },
  { path: 'schedule', component: SchedulePageComponent },
  { path: 'configuration', component: ConfigurationPageComponent },
  { path: '', redirectTo: '/centers', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
