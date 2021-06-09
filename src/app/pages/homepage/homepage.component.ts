import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { combineLatest, Observable, of } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { tap, catchError, map, switchMap } from 'rxjs/operators';

import { MovieShowResult, QueryMovieShowResult } from 'src/app/models/movie.model';
import { HerokuService } from 'src/app/services/heroku.service';
import { TraktService } from 'src/app/services/trakt.service';
import { RecommenderService } from 'src/app/services/recommender.service';

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
  movieOfTheDay$: Observable<any>;
  user: any;
  movie: any;
  constructor(private trakt: TraktService, private heroku: HerokuService, public auth: AuthService,
    private recommender: RecommenderService) {}

  ngOnInit(): void {
    this.movieOfTheDay$ = this.auth.user$.pipe(
      switchMap(
        (user) =>
          this.recommender.sendRecommendation(user.nickname, {
            "88": 5,
            "79": 3.5,
            "101": 2,
            "1045": 5
          })
      ),
      tap(console.log)
    )

    combineLatest([this.auth.user$, this.movieOfTheDay$])
          .pipe(
            tap(console.log)
          )
          .subscribe(([user, movie]) => {
            this.user = user;
            this.movie = movie;
          })
  }

  onSubmit(form: NgForm) {
    // Search
    this.loading = true;
    this.trakt.query(this.searchEntry).pipe(
      map((value: QueryMovieShowResult[]) => value
        .map(x =>  x.type === 'movie' ? { ...x, ...x.movie } : { ...x, ...x.show })),
      tap(),
      catchError(() => {
        return of([]);
      }))
      .subscribe((data: MovieShowResult[]) => {
          this.loading = false;
          this.relatedMovies = data;
        });
    this.submitted = true;
  }

  fetchBackendHome() {
    this.heroku.fetchHome().subscribe(window.alert);
  }
}
