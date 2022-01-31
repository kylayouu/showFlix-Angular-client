import { Component, OnInit } from '@angular/core';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent implements OnInit {

  user : any = {};
  favoriteMovies : any = [];
  movies : any = [];
  favoritesList : any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((result: any) => {
      this.movies = result;
      // console.log(this.movies);
      return this.filterFavorites();
    })
  }

  /**
   * gets user's favorite movies list
  */
  getFavorites(): void {
    this.fetchApiData.getUser().subscribe((result: any) => {
      this.favoritesList = result.FavoriteMovies;
      // console.log(this.filterFavorites());
      // console.log(this.favoritesList);
      return this.favoritesList;
    });
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
    });
    return this.getFavorites();
  }

  /**
   * deletes a movie from a user's favorites list
   * @param movieId of the movie to be deleted from user's favorites list
   */
  deleteFavorite(movieId: string): void {
    this.fetchApiData.deleteFavorite(movieId).subscribe((result: any) => {
      console.log(result);
      // this.ngOnInit();
      this.snackBar.open('Movie has been removed from favorites.', 'OK', {
        duration: 3000
      });
      setTimeout(function () {
        window.location.reload();
      });
    });
    // return this.getFavorites();
  }

  /**
   * pushes user's favorite movie into favoriteMovies array
   * @returns an array of user's favorite movies as objects
   */
  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.favoritesList.includes(movie._id)) {
        this.favoriteMovies.push(movie);
      }
    });
    console.log(this.favoriteMovies);
    // console.log(this.movies);
    return this.favoriteMovies;
  }

  /**
   * opens dialog showing genre data
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
   * opens dialog showing director data
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
   * opens dialog showing movie's synopsis data
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
   * toggle function to either add movie to favorites or not
   * @param movieId movie ID of movie to add to favorites or not
   */
   toggleFavorite(movieId: any): any {
    if (this.favoritesList.includes(movieId)) {
      return true;
    } else {
      return false;
    }
  }

}
