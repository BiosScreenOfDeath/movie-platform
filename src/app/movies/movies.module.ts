import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteMoviesComponent } from './favorite-movies/favorite-movies.component';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FavoriteMoviesComponent, AllMoviesComponent, MovieDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [FavoriteMoviesComponent, AllMoviesComponent, MovieDetailsComponent]
})
export class MoviesModule { }
