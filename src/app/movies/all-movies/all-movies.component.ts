import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
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
    private formBuilder: FormBuilder) {}

  addEntry(title: string, description: string, date: string){
    console.log("Adding movie:"+title);

    this.authenticate.addMovie(title, description, date);
  }

  displayMovies(){
    this.authenticate.getMovies()
    .subscribe(movies => {
      this.movieList = new BehaviorSubject<Movie[]>(movies);
    });
  }

  searchMovie(title: string){
    console.log(title);
  }

  ngOnInit(): void {
    this.addMovieForm = this.formBuilder.group({
      addMovieTitle: ['', Validators.required],
      addMovieDescription: ['', Validators.required],
      addMovieDate: ['', Validators.required]
    });

    this.displayMovies();
  }

}
