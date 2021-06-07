import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { MovieShowResult, QueryMovieShowResult } from 'src/app/models/movie.model';
import { HerokuService } from 'src/app/services/heroku.service';
import { TraktService } from 'src/app/services/trakt.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  loading = false;
  searching = false;
  searchEntry: any;
  submitted = false;
  selectedMovie: any = null;
  relatedMovies: MovieShowResult[] = [];
  constructor(private trakt: TraktService, private heroku: HerokuService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    // Search
    this.loading = true;
    this.trakt.query(this.searchEntry).pipe(
      map((value: QueryMovieShowResult[]) => value
        .map(x =>  x.type === 'movie' ? { ...x, ...x.movie } : { ...x, ...x.show })),
      tap(console.log),
      catchError(() => {
        return of([]);
      }))
      .subscribe((data: MovieShowResult[]) => {
          this.loading = false;
          console.log('data', data);
          this.relatedMovies = data;
        });
    this.submitted = true;
  }

  fetchBackendHome() {
    this.heroku.fetchHome().subscribe(window.alert);
  }
}
