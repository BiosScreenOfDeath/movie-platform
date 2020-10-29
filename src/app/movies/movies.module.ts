import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteMoviesComponent } from './favorite-movies/favorite-movies.component';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [FavoriteMoviesComponent, AllMoviesComponent, MovieDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  exports: [FavoriteMoviesComponent, AllMoviesComponent, MovieDetailsComponent]
})
export class MoviesModule { }
