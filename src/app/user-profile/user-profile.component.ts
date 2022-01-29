import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditUserProfileComponent } from '../edit-user-profile/edit-user-profile.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  // Username = localStorage.getItem('user');
  user : any = {};
  favoriteMovies : any = {};

  constructor( 
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.getUser();
    this.getFavorites();
  }

  /**
   * gets user information
   * @returns user data as an object
   */
  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((result: any) => {
      this.user = result;
      console.log(this.user);
    })
    return this.user;
  }

  /**
   * deletes user
   * @returns user deletion status and navigates to welcome page
   */
  deleteUser(): void {
    this.fetchApiData.deleteUser(this.user).subscribe(() => {
      this.snackBar.open('User has been removed successfully.' , 'OK', {
        duration: 3000
      });
      localStorage.clear();
      this.router.navigate(['welcome']);
    });
  }

  /**
   * gets user's favorite movies list
   */
  getFavorites(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((result: any) => {
      this.favoriteMovies = result.FavoriteMovies;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  /**
   * deletes a movie from a user's favorites list
   * @param movieId of the movie to be deleted from user's favorites list
   */
  deleteFavorite(movieId: string): void {
    this.fetchApiData.deleteFavorite(movieId).subscribe((result: any) => {
      console.log(result);
      this.ngOnInit();
      this.snackBar.open('Movie has been removed from favorites.', 'OK', {
        duration: 3000
      });
    })
  }

  /**
   * opens dialog showing form for user to edit information
   */
  openEditUserProfileDialog(): void {
    this.dialog.open(EditUserProfileComponent, {
    width: '500px'
    });
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

}
