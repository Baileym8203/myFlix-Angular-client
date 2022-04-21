import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
//import { request } from 'http';
const apiUrl = 'https://bestmoviecentral.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService { 
  
  //start of Registration service!
  
  // exported class
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
 
  constructor(private http: HttpClient) {
    // constructor
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

  public userRegistration(userDetails: any): Observable<any> {
    // public function userRegistration
    console.log(userDetails);
    return this.http
    .post(apiUrl + 'users', userDetails,)
    .pipe(catchError(this.handleError));
  }

  public userLogin(userDetails: any): Observable<any> {
    //public function userLogin
    const token = localStorage.getItem('token');
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails,  {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }
}

// start of movies service
@Injectable({
  providedIn: 'root',
})
export class GetMoviesService {
  constructor(private http: HttpClient) {
    // constructor
  }

  private extractResponseData(res: Response): any {
    console.log(res);
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

  public getAllMovies(): Observable<any> {
    //public function getallmovies
    const token = localStorage.getItem('token');
    return this.http
      .get<any>(apiUrl + 'movies', {
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
      .get<any>(apiUrl + 'movies' + movieTitle, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getDirector(name: string): Observable<any> {
    //public function getDirector
    const token = localStorage.getItem('token');
    return this.http
      .get<any>(apiUrl + 'Director/' + name, {
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
      .get<any>(apiUrl + 'genre' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public deleteFavMovie(userDetails: any, movieId: any): Observable<any> {
    //public function deleteFavMovie
    const token = localStorage.getItem('token');
    return this.http
      .delete<any>(apiUrl + 'users' + userDetails + 'movies' + movieId)
      .pipe(catchError(this.handleError));
  }

  public getFavMovie(userDetails: any, movieId: any): Observable<any> {
    //public function getUser
    const token = localStorage.getItem('token');
    return this.http
      .get<any>(apiUrl + 'users' + userDetails + 'movies' + movieId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public addFavMovie(username: string, movieId: Object): Observable<any> {
    // public function userRegistration
     const token = localStorage.getItem('token');
    return this.http
      .post<any>(
        apiUrl + 'users/' +
        username + '/movies/' + movieId,
        {},
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class GetUserService {
  constructor(private http: HttpClient) {
    // constructor
  }

  public getUser(username: string): Observable<any> {
    //public function getUser
    const token = localStorage.getItem('token');
    return this.http
      .get<any>(apiUrl + 'users/' + username, {
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
      .put<any>(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  public deleteUser(userDetails: any): Observable<any> {
    //public function deleteuser
    console.log(userDetails);
    return this.http
      .delete<any>(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  private extractResponseData(res: Response): any {
    console.log(res);
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
