import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  // variable declared as an array for movies returned from API
  movies: any[] = [];

  constructor( public fetchApiData: FetchApiDataService ) { }

  // called when Angular is done creating the component
  ngOnInit(): void {
    this.getMovies()
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((result: any) => {
      this.movies = result;
      console.log(this.movies);
      return this.movies;
    })
  }
}
