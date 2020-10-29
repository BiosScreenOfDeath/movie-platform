import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Movie } from 'src/app/_models/movie';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie = {
    id: "",
    title: "",
    description: "",
    dateReleased: "",
  };

  constructor(
    private authenticate: AuthenticationService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.movie.title = params['title'];
      this.movie.description = params['description'];
      this.movie.dateReleased = params['dateReleased'];
      console.log("Movie selected: "+params['title']);
    });
  }

}
