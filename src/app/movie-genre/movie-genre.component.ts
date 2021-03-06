import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-genre',
  templateUrl: './movie-genre.component.html',
  styleUrls: ['./movie-genre.component.css'],
})
export class MovieGenreComponent implements OnInit {
  Genre: any;
  constructor(@Inject(MAT_DIALOG_DATA) private data: { Genre: any }) {}

  ngOnInit(): void {
    this.Genre = this.data.Genre;
    console.log(this.Genre);
  }
}
