import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  // variable declared as an array for movies returned from API
  user: any = JSON.parse(localStorage.getItem('user') || '');
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor( 
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar

  ) { }

  // called when Angular is done creating the component
  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
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

  getFavorites(): void {
    this.fetchApiData.getUser(this.user).subscribe((result: any) => {
      this.favoriteMovies = result.FavoriteMovies;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    })
  }

  addFavorite(movieId: string): void {
    this.fetchApiData.addFavorite(movieId).subscribe((result: any) => {
      console.log(result);
      this.snackBar.open('Movie has been added to your favorites.', 'OK', {
        duration: 3000
      });
      this.ngOnInit();
    })
  }

  deleteFavorite(movieId: string): void {
    this.fetchApiData.deleteFavorite(movieId).subscribe((result: any) => {
      console.log(result);
      this.ngOnInit();
      this.snackBar.open('Movie has been removed from favorites.', 'OK', {
        duration: 3000
      });
    });
    return this.getFavorites();
  }

  inFaveList(movieId: string): boolean {
    return this.favoriteMovies.some((movie) => movie._id === movieId)
  }

  toggleFavorite(movie: any): void {
    this.inFaveList(movie._id)
      ? this.deleteFavorite(movie._id)
      : this.addFavorite(movie._id);
  }
}
