import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FavoriteMovie } from 'src/app/_models/favorite-movie';
import { Movie } from 'src/app/_models/movie';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.css']
})
export class FavoriteMoviesComponent implements OnInit {

  favoriteMovieList: BehaviorSubject<FavoriteMovie[]>;

  constructor(
    private authenticate: AuthenticationService,
    private router: Router) { }

  // Redirects to movie's details.
  movieDetails(movie: Movie){
    this.router.navigate(['movie-details', movie]);
  }

  // Deletes movie from user's favorites.
  removeFromFavorites(title: string, favoriteId: string){
    console.log(`Removing ${title}(favoriteId: ${favoriteId}) from favorites.`);
    this.authenticate.removeFavoriteMovie(favoriteId)
    .subscribe(data => {
      this.displayFavorites();
    });

    console.log("Refreshing list.");
  }

  // Gets all favorites from server.
  displayFavorites(){
    this.authenticate.getFavoriteMovies()
    .subscribe(favorites => {
      this.favoriteMovieList = new BehaviorSubject<FavoriteMovie[]>(favorites);
    });
  }

  // Ensures proper access and displays user's favorites.
  ngOnInit(): void { this.displayFavorites(); }
}
