import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MovieDetailComponent} from './pages/movie-detail/movie-detail.component';
import {HomepageComponent} from './pages/homepage/homepage.component';
import {ProfileDetailComponent} from './pages/profile-detail/profile-detail.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [{path: 'movie/:id', component: MovieDetailComponent},
                        {path: 'homepage', component: HomepageComponent},
                        {path: 'sign-in', component: LoginComponent},
                        {path: 'profile', component: ProfileDetailComponent},
                        {path: '', redirectTo: 'homepage', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
