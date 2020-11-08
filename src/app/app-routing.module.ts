import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AllMoviesComponent } from './movies/all-movies/all-movies.component';
import { FavoriteMoviesComponent } from './movies/favorite-movies/favorite-movies.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { RegisterComponent } from './register/register.component';
import { SiteGuardService } from './_services/site-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [SiteGuardService] },
  { path: 'edit', component: EditComponent, canActivate: [SiteGuardService] },
  { path: 'all-movies', component: AllMoviesComponent, canActivate: [SiteGuardService] },
  { path: 'favorite-movies', component: FavoriteMoviesComponent, canActivate: [SiteGuardService] },
  { path: 'movie-details', component: MovieDetailsComponent, canActivate: [SiteGuardService] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
