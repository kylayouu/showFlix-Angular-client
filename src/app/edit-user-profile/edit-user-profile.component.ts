import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit {

  user : any = JSON.parse(localStorage.getItem('user') || '');
  @Input() userData = { 
    Username: this.user.Username, 
    Password: '', 
    Email: this.user.Email, 
    Birthday: this.user.Birthday
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditUserProfileComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
  editUserProfile(): void {
    this.fetchApiData.editUser(this.user.Username, this.userData).subscribe((result) => {
    this.dialogRef.close(); // This will close the modal
    console.log(result);
    localStorage.setItem('user', JSON.stringify(result))
    this.snackBar.open('User profile update successful', 'OK', {
        duration: 2000
    });
    this.router.navigate(['profile']);
    }, (result) => {
      console.log(result);
      this.snackBar.open('User profile has failed to update. Please try again.', 'OK', {
        duration: 2000
      });
    });
  }

}
