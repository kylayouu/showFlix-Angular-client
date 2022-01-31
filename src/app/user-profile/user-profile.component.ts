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

  // getUserFromStorage: any = localStorage.getItem('user');
  // userFromStorage: any = JSON.parse(this.getUserFromStorage);
  // username: any = this.userFromStorage.Username;
  user : any = {};

  constructor( 
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * gets user information
   * @returns user data as an object
   */
  getUser(): void {
    // const user = (JSON.parse(localStorage.getItem('user') || ''));
    // const user = localStorage.getItem('user');
    // console.log(user);
    this.fetchApiData.getUser().subscribe((result: any) => {
      this.user = result;
      return this.user;
    })
  }

  // /**
  //  * deletes user
  //  * @returns user deletion status and navigates to welcome page
  //  */
  // deleteUser(): void {
  //   // const user = localStorage.getItem('user');
  //   this.fetchApiData.deleteUser(this.user.Username).subscribe((result: any) => {
  //     console.log(this.user.Username + 'has been deleted');
  //     this.snackBar.open('User has been removed successfully.' , 'OK', {
  //       duration: 3000
  //     });
  //     localStorage.clear();
  //     this.router.navigate(['welcome']);
  //   });
  // }

    /**
   * opens dialog showing form for user to edit information
   */
  openEditUserProfileDialog(): void {
    this.dialog.open(EditUserProfileComponent, {
    width: '500px'
    });
  }

}
