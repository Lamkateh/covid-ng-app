import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePublicPageComponent } from './home-public-page/home-public-page.component';
import { VaccinationCenterListComponent } from './vaccination-center-list/vaccination-center-list.component';
import { VaccinationCenterComponent } from './vaccination-center/vaccination-center.component';

const routes: Routes = [
  { path: 'centers', component: HomePublicPageComponent },
  { path: 'centers/detail/:id', component: VaccinationCenterComponent },
  { path: '', redirectTo: '/centers', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
