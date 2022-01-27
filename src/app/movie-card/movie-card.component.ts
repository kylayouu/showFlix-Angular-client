import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  // variable declared as an array for movies returned from API
  movies: any[] = [];

  constructor( 
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,

  ) { }

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

  openGenreDialog(
    name: string,
    description: string
  ): void {
    this.dialog.open(GenreViewComponent, {
      data: { name: name, description: description },
      width: '400px'
    })
  }

  openDirectorDialog(
    name: string,
    bio: string,
    birth: any
  ): void {
    this.dialog.open(DirectorViewComponent, {
      data: { name: name, bio: bio, birth: birth },
      width: '400px'
    })
  }

  openSynopsisDialog(
    title: string,
    description: string
  ): void {
    this.dialog.open(SynopsisViewComponent, {
      data: { title: title, description: description },
      width: '400px'
    })
  }

}
