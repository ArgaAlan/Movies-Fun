import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProfileDetailComponent } from './pages/profile-detail/profile-detail.component';
import { AuthGuard } from '@auth0/auth0-angular'

const routes: Routes = [
  { path: ':type/:id', component: MovieDetailComponent, canActivate: [AuthGuard] },
  { path: 'homepage', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileDetailComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
