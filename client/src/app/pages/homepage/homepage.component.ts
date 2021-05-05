import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OperatorFunction, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError, map } from 'rxjs/operators';

import { MovieShowResult, QueryMovieShowResult } from 'src/app/models/movie.model';
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
  constructor(private trakt: TraktService) {}

  ngOnInit(): void {}

  search: OperatorFunction<string, readonly QueryMovieShowResult[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.trakt.query(term).pipe(
          map((value: QueryMovieShowResult[]) => value
            .map(x =>  x.type === 'movie' ? { ...x, ...x.movie } : { ...x, ...x.show })),
          tap(console.log),
          catchError(() => {
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

  formatter = (x: any) => {
    this.selectedMovie = x;
    return x.title;
  };

  onSubmit(form: NgForm) {
    // Search
    this.loading = true;
    this.trakt.getRelatedMovies(this.searchEntry.type, this.searchEntry.ids.slug)
      .pipe(
        map((values: MovieShowResult[]) => values.map(x => {
          x.type = this.searchEntry.type;
          return x;
        }))
      )
      .subscribe((data: MovieShowResult[]) => {
          this.loading = false;
          console.log('data', data);
          this.relatedMovies = data;
        });
    this.submitted = true;
  }
}
