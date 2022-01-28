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
  user : any = JSON.parse(localStorage.getItem('user') || '');
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

  getUser(): void {
    this.fetchApiData.getUser(this.user).subscribe((result: any) => {
      this.user = result;
      console.log(this.user);
      return this.user;
    })
  }

  deleteUser(): void {
    this.fetchApiData.deleteUser(this.user).subscribe(() => {
      this.snackBar.open('User has been removed successfully.' , 'OK', {
        duration: 3000
      });
      localStorage.clear();
      this.router.navigate(['welcome']);
    });
  }

  getFavorites(): void {
    this.fetchApiData.getUser(this.user).subscribe((result: any) => {
      this.favoriteMovies = result.FavoriteMovies;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  deleteFavorite(movieId: string): void {
    this.fetchApiData.deleteFavorite(movieId).subscribe((result: any) => {
      console.log(result);
      this.ngOnInit();
      this.snackBar.open('Movie has been removed from favorites.', 'OK', {
        duration: 3000
      });
    })
  }

  // This is the function that will open the dialog when the Edit Profile button is clicked  
  openEditUserProfileDialog(): void {
    this.dialog.open(EditUserProfileComponent, {
  // Assigning the dialog a width
    width: '500px'
    });
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
