import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Declaring the api url that will provide data for the client app
 */
const apiUrl = 'https://cryptic-tor-08539.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
/**
 * Inject the HttpClient module to the constructor params
 * This will provide HttpClient to the entire class, making it available via this.http
*/ 
  constructor(private http: HttpClient) {
  }

 /**
  * Making the api call for the user registration endpoint
  * @param userDetails 
  * @returns registered user's data as an object
  */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users/register', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  /**
   * Making the api call for the user login endpoint
   * @param userDetails takes user's login data
   * @returns logged in user's data as an object
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  
  /**
   * Making the api call for getting the list of all movies
   * @returns movies as an object
   */
  public getAllMovies(): Observable<any> {
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

  /**
   * Making the api call for getting data for a single movie by its title
   * @param title of movie
   * @returns a movie object
   */
  public getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title , {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Making the api call for getting data for a genre by name
   * @param name of genre
   * @returns a genre object
   */
  public getGenre(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres/' + name , {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Making the api call for getting data for a director by name
   * @param name of director
   * @returns director object
   */
  public getDirector(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/' + name , {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Making the api call for getting a user's info
   * @param username of user
   * @returns user data as an object
   */
  public getUser(): Observable<any> {
    // const user = username.Username;
    const username = localStorage.getItem('user');
    console.log(username);
    // console.log('user', user);
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Making the api call for editing a user's info
   * @param username of user
   * @param newUserInfo new info to update user's data
   * @returns updated user data as an object
   */
  public editUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${username}`, userData, {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Making the api call for getting a user's favorite movies
   * @param username of user
   * @param movieId movie ID of the movie in user's favorites list
   * @returns favorite movies list of user as an object
   */
  public getFavorites(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = username.Username
    return this.http.get(apiUrl + 'users/' + user + '/favorites' , {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Making the api call for adding a movie to a user's favorites list
   * @param movieId of the movie the user wants to add to favorites list
   * @returns user's data with updated favorites list
   */
  public addFavorite(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.post(apiUrl + 'users/' + username + '/favorites/' + movieId, {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }),
      responseType: 'text'
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Making the api call for removing a movie from a user's favorites list
   * @param movieId of the movie the user wants to delete from favorites list
   * @returns user's data with updated favorites list
   */
  public deleteFavorite(movieId: string): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username + '/favorites/' + movieId, {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }),
      responseType: 'text'
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Making the api call for deleting a user
   * @param username of the user to be deleted
   * @returns user deleted status
   */
  public deleteUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username , {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

/**
 * Non-typed response extraction
 */
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
        `Error body is: ${JSON.stringify(error.error)}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}