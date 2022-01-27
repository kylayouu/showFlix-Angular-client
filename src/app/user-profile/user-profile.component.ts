import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditUserProfileComponent } from '../edit-user-profile/edit-user-profile.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user : any = JSON.parse(localStorage.getItem('user') || '');
  favoriteMovies : any = {};
  movies : any[] = [];

  constructor( 
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getUser(this.user).subscribe((result: any) => {
      this.user = result;
      console.log(this.user);
      return this.user;
    })
  }

  getFavorites(): void {
    this.fetchApiData.getAllMovies().subscribe((result: any) => {
      this.movies = result;
      this.movies.forEach((movie: any) => {
        if (this.user.FavoriteMovies.includes(movie._id)) {
        this.favoriteMovies.push(movie);
        }
      });
    });
    return this.favoriteMovies;
  }

  deleteUser(): void {
    this.fetchApiData.deleteUser(this.user).subscribe(() => {
      localStorage.removeItem('user');
      this.snackBar.open('User has been removed successfully.' , 'OK', {
        duration: 3000
      });
      this.router.navigate(['welcome']);
    }, (result) => {
      console.log(result);
      this.snackBar.open('User could not be deleted. Please try again.', 'OK', {
        duration: 3000
      });
    });
  }

  // This is the function that will open the dialog when the Edit Profile button is clicked  
  openEditUserProfileDialog(): void {
    this.dialog.open(EditUserProfileComponent, {
  // Assigning the dialog a width
    width: '500px'
    });
  }

}
