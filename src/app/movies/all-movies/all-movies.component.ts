import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Movie } from 'src/app/_models/movie';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css']
})
export class AllMoviesComponent implements OnInit {

  movieList: BehaviorSubject<Movie[]>;
  addMovieForm: FormGroup;

  @ViewChild('addMovie')
  addMovie: ElementRef;

  @ViewChild('searchTitle')
  searchTitle: ElementRef;

  constructor(
    private authenticate: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router) {}


  // Deletes movie via id.
  deleteMovie(id: string){
    this.authenticate.deleteMovie(id)
    .subscribe(data => {
      this.displayMovies();
    });
  }

  // Redirects to the details of the movie.
  movieDetails(movie: Movie){
    this.router.navigate(['movie-details', movie]);
  }

  // Movie is added to the user's favorites.
  addFavorite(title: string, titleId: string){
    console.log(`Adding ${title}(id: ${titleId}) to favorites.`);
    this.authenticate.addFavoriteMovie(titleId);
  }

  // Movie is added to the database.
  addEntry(title: string, description: string, date: string){
    console.log("Adding movie:"+title);
    this.authenticate.addMovie(title, description, date)
    .subscribe(movie => {
      this.displayMovies();
    });;
  }

  // Gets all movies from the database.
  displayMovies(){
    return this.authenticate.getMovies()
    .subscribe(movies => {
      this.movieList = new BehaviorSubject<Movie[]>(movies);
    });
  }

  // Returns the search value.
  searchMovie(title: string){
    return title;
  }

  // Sets up the form,
  // ensures no-unauthorized acess,
  // displays all movies.
  ngOnInit(): void {

    this.addMovieForm = this.formBuilder.group({
      addMovieTitle: ['', Validators.required],
      addMovieDescription: ['', Validators.required],
      addMovieDate: ['', Validators.required]
    });

    console.log("Displaying movies...");
    this.displayMovies();
  }
}
