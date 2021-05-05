import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Movie, MovieShowResult, QueryMovieShowResult } from '../models/movie.model';
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

  public getMovieDetails(type: 'movie' | 'show', slug: string): Observable<Movie> {
    return this.http
      .get<Movie>(`https://api.trakt.tv/${type}s/${slug}`, {
        headers,
        params: fullParams,
      })
      .pipe(
        switchMap((movie) => {
          let tmdbType: any = type === 'movie' ? type : 'tv'
          return this.tmdb.getImageUrl(tmdbType, movie.ids.tmdb.toString()).pipe(
            map((res: MovieImagesResult) => {
              const posters = res.posters.map((poster) => poster.file_path);
              const imageUrl = posters[randomIndex(posters.length)];
              return { ...movie, imageUrl };
            })
          );
        })
      );
  }

  public getRelatedMovies(type: string, idSlug: string): Observable<MovieShowResult[]> {
    return this.http.get<MovieShowResult[]>(
      `https://api.trakt.tv/${type}s/${idSlug}/related`,
      {
        headers,
      }
    );
  }

  public query(query: string): Observable<QueryMovieShowResult[]> {
    return this.http.get<QueryMovieShowResult[]>(
      `https://api.trakt.tv/search/movie,show?query=${query}`,
      {
        headers,
      }
    )
  }
}
