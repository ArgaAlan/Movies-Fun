import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const headers = new HttpHeaders().append(
  'Authorization',
  `Bearer ${environment.tmdbToken}`
);

@Injectable({
  providedIn: 'root',
})
export class TMDBService {
  constructor(private http: HttpClient) {}

  getImageUrl(type: 'movie' | 'tv', imdb: string) {
    return this.http
      .get(`https://api.themoviedb.org/3/${type}/${imdb}/images`, { headers })
      .pipe();
  }
}
