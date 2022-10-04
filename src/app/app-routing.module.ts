import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePublicPageComponent } from './home-public-page/home-public-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { VaccinationCenterPageComponent } from './vaccination-center-page/vaccination-center-page.component';

const routes: Routes = [
  { path: 'centers', component: HomePublicPageComponent },
  { path: 'centers/:id', component: VaccinationCenterPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: '/centers', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
