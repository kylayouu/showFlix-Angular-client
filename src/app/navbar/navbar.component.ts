import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.isUserLoggedOut();
  }

  public onLogOut(): void {
    localStorage.clear();
    this.snackBar.open('You have been logged out.', 'OK', {
      duration: 2000
    });
    this.router.navigate(['welcome'])
  }

  // public isUserLoggedOut(): void {
  //   if (localStorage.getItem('user') === null) {
  //   }
  // }

}
