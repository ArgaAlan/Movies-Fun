import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MovieDetailComponent} from './pages/movie-detail/movie-detail.component';
import {HomepageComponent} from './pages/homepage/homepage.component';
import {ProfileDetailComponent} from './pages/profile-detail/profile-detail.component';

const routes: Routes = [{path: 'movie/:id', component: MovieDetailComponent},
                        {path: 'homepage', component: HomepageComponent},
                        {path: 'profile', component: ProfileDetailComponent},
                        {path: '', redirectTo: 'homepage', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
