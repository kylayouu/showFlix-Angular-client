import { Injectable } from '@angular/core';
// import { catchError } from 'rxjs/internal/operators';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://cryptic-tor-08539.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users/register', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  // Making the api call for the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  // Making the api call for getting the list of all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for getting data for a single movie by its title
  getMovie(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:Title', {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for getting data for a genre by name
  getGenre(genre: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres/:Name', {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for getting data for a director by name
  getDirector(director: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/:Name', {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for getting a user's info
  getUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for editing a user's info
  editUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for getting a user's favorite movies
  getFavorites(movieId: any): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}/favorites/:MovieID`, {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for adding a movie to a user's favorites list
  addFavorite(movieId: any): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + `users/${username}/favorites/:MovieID`, {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for removing a movie from a user's favorites list
  deleteFavorite(movieId: any): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}/favorites/:MovieID`, {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for deleting a user
  deleteUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


// Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}