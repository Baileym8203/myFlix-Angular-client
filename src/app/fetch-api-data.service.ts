import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { request } from 'http';
const apiUrl = 'https://bestmoviecentral.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  // exported class
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http

  constructor(private http: HttpClient) {
    // constructor
  }

  public userRegistration(userDetails: any): Observable<any> {
    // public function userRegistration
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  public userLogin(userDetails: any): Observable<any> {
    //public function userLogin
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  public getAllMovies(): Observable<any> {
    //public function getallmovies
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getMovies(movieTitle: any): Observable<any> {
    //public function getmovies
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies' + movieTitle, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getDirector(directorName: any): Observable<any> {
    //public function getDirector
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'Director' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getGenre(genreName: any): Observable<any> {
    //public function getGenre
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'genre' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getUser(): Observable<any> {
    //public function getUser
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public editUser(userDetails: any): Observable<any> {
    //public function edituser
    console.log(userDetails);
    return this.http
      .put(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  public deleteUser(userDetails: any): Observable<any> {
    //public function deleteuser
    console.log(userDetails);
    return this.http
      .delete(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  public deleteFavMovie(userDetails: any, movieId: any): Observable<any> {
    //public function deleteFavMovie
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users' + userDetails + 'movies' + movieId)
      .pipe(catchError(this.handleError));
  }

  public getFavMovie(userDetails: any, movieId: any): Observable<any> {
    //public function getUser
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users' + userDetails + 'movies' + movieId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public addFavMovie(userDetails: any, movieId: any): Observable<any> {
    // public function userRegistration
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users',userDetails + 'movies', movieId)
      .pipe(catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    // private function handleError
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status},` + `Error body is: ${error.error}`
      );
    }
    return throwError('something bad happened; please try again later.');
  }
}
