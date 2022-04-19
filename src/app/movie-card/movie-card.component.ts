import { Component, OnInit } from '@angular/core';
import { GetMoviesService } from '../fetch-api-data.service';

// using this import to close the dialog on success
import { MatDialog } from '@angular/material/dialog';

// using this import to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  Directors: any[] = [];

  constructor(
    public fetchMovies: GetMoviesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((res: any) => {
      this.movies = res;
    });
  }

  openDirectorDialog(Director: any): void {
    this.dialog.open(MovieDirectorComponent, {
      // assigning the dialog a width
      width: '400px',
      data: { Director },
    });
  }

  openGenreDialog(Genre: any): void {
    this.dialog.open(MovieGenreComponent, {
      // assigning the dialog a width
      width: '400px',
      data: { Genre },
    });
  }

  openDescriptionDialog(Description: any): void {
    this.dialog.open(MovieDescriptionComponent, {
      // assigning the dialog a width
      width: '400px',
      data: { Description },
    });
  }

  addFavoriteMovies(movie: any): void {
    const user = JSON.parse(localStorage.getItem('user') as string);
    this.fetchMovies.addFavMovie(movie._id, user.username).subscribe(
      (response: any) => {
        if (movie) {
          this.snackBar.open('Movie has been added', 'Close', {
            duration: 3000,
          });
        }
      },
      () => {
        this.snackBar.open('Movie has already been added', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
