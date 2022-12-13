import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenterManagementPageComponent } from './components/centers/center-management-page/center-management-page.component';
import { CentersManagementPageComponent } from './components/centers/centers-management-page/centers-management-page.component';
import { ConfigurationPageComponent } from './components/configuration-page/configuration-page.component';
import { HomePublicPageComponent } from './components/home-public-page/home-public-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SchedulePageComponent } from './components/schedule-page/schedule-page.component';
import { CenterPageComponent } from './components/centers/center-page/center-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { RoleGuardService as RoleGuard } from './services/role-guard.service';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'centers',
    component: HomePublicPageComponent,
  },
  {
    path: 'centers/:id',
    component: CenterPageComponent,
  },
  {
    path: 'management/centers',
    component: CentersManagementPageComponent,
    canActivate: [RoleGuard],
    data: { roles: ['SUPERADMIN'] },
  },
  {
    path: 'management/mycenter',
    component: CenterManagementPageComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ADMIN'] },
  },
  {
    path: 'myschedule',
    component: SchedulePageComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ADMIN', 'DOCTOR'] },
  },
  {
    path: 'configuration',
    component: ConfigurationPageComponent,
    canActivate: [RoleGuard],
    data: { roles: ['SUPERADMIN'] },
  },
  { path: '**', redirectTo: '/centers', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
