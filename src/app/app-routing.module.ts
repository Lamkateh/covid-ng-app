import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePublicPageComponent } from './home-public-page/home-public-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { VaccinationCenterComponent } from './vaccination-center/vaccination-center.component';

const routes: Routes = [
  { path: 'centers', component: HomePublicPageComponent },
  { path: 'centers/:id', component: VaccinationCenterComponent },
  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: '/centers', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
