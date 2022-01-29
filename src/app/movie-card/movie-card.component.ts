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
  
  /**
   * variable declared as an array for movies returned from API
   */
  user: any = [];
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor( 
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar

  ) { }

  /**
   * called when Angular is done creating the component
   */
  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  /**
   * gets list of all movies
   * @returns array of movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((result: any) => {
      this.movies = result;
      console.log(this.movies);
      return this.movies;
    })
  }

  /**
   * opens dialog showing genre information
   * @param name of genre
   * @param description of genre
   */
  openGenreDialog(
    name: string,
    description: string
  ): void {
    this.dialog.open(GenreViewComponent, {
      data: { name: name, description: description },
      width: '400px'
    })
  }

  /**
   * opens dialog showing director information
   * @param name of director
   * @param bio of director
   * @param birth of director
   */
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

  /**
   * opens dialog showing synopsis information
   * @param title of movie
   * @param description of movie
   */
  openSynopsisDialog(
    title: string,
    description: string
  ): void {
    this.dialog.open(SynopsisViewComponent, {
      data: { title: title, description: description },
      width: '400px'
    })
  }

  /**
   * function to get user's favorite movies list
   * @returns array of user's favorite movies
   */
  getFavorites(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((result: any) => {
      this.favoriteMovies = result.FavoriteMovies;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    })
  }

  /**
   * function to add movie to user's favorites list
   * @param movieId movie ID of movie to add to user's favorites list
   * @returns updated array with new favorited movie
   */
  addFavorite(movieId: string): void {
    this.fetchApiData.addFavorite(movieId).subscribe((result: any) => {
      console.log(result);
      this.snackBar.open('Movie has been added to your favorites.', 'OK', {
        duration: 3000
      });
      this.ngOnInit();
    });
    return this.getFavorites();
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

  /**
   * to check if movie is already part of user's favorites
   * @returns boolean true or false
   */
  inFaveList(movieId: string): boolean {
    return this.favoriteMovies.some((movie) => movie._id === movieId)
  }

  /**
   * toggle function to either add movie to favorites or not
   * @param movie movie ID of movie to add to favorites or not
   */
  toggleFavorite(movie: any): void {
    this.inFaveList(movie._id)
      ? this.deleteFavorite(movie._id)
      : this.addFavorite(movie._id);
  }
}
