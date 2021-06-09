import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, switchMap, tap } from 'rxjs/operators';
import { TraktService } from './trakt.service';

const BASEURL = "http://localhost:3200"

@Injectable({
  providedIn: 'root',
})
export class RecommenderService {
  constructor(private http: HttpClient, private trakt: TraktService) {}

  sendRecommendation(userId: string, userRatings: {}) {
    return this.http
      .post<any>(`${BASEURL}/${userId}`, userRatings)
      .pipe(
        switchMap((value) => this.trakt.findMovieByIMDB(value.tmdbId)),
        map((value) => value[0].movie),
      );
  }
}
