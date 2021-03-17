import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Movie, MovieResult } from '../models/movie.model';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { TMDBService } from './tmdb.service';

const headers = new HttpHeaders()
  .append('trakt-api-key', environment.clientId)
  .append('trakt-api-version', '2');

const fullParams = new HttpParams().append('extended', 'full');

function randomIndex(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

interface MovieImagesResult {
  backdrops: any[];
  id: number;
  posters: any[];
}

@Injectable({
  providedIn: 'root',
})
export class TraktService {
  constructor(private http: HttpClient, private tmdb: TMDBService) {}

  public getMovieDetails(slug: string): Observable<Movie> {
    return this.http
      .get<Movie>(`https://api.trakt.tv/movies/${slug}`, {
        headers,
        params: fullParams,
      })
      .pipe(
        switchMap((movie) => {
          return this.tmdb.getImageUrl('movie', movie.ids.tmdb.toString()).pipe(
            map((res: MovieImagesResult) => {
              const posters = res.posters.map((poster) => poster.file_path);
              const imageUrl = posters[randomIndex(posters.length)];
              return { ...movie, imageUrl };
            })
          );
        })
      );
  }

  public getRelatedMovies(): Observable<MovieResult[]> {
    return this.http.get<MovieResult[]>(
      'https://api.trakt.tv/movies/iron-man-2008/related',
      {
        headers,
      }
    );
  }
}
