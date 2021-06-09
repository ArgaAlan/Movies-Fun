import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieShowResult } from 'src/app/models/movie.model';
import { TraktService } from 'src/app/services/trakt.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  loading = true;
  movie: Movie;
  type: string;
  slug: string;
  relatedMovies: MovieShowResult[] = [];

  constructor(private route: ActivatedRoute, private trakt: TraktService) {}

  ngOnInit(): void {
    this.route.params.subscribe(({type, id}) => {
      this.type = type;
      this.slug = id;
      this.trakt.getMovieDetails(this.type, this.slug).subscribe((movie: Movie) => {
        this.movie = movie;
        this.movie.updated_at = new Date(this.movie.updated_at);
        this.loading = false;
      });
      this.trakt.getRelatedMovies(type, this.slug).subscribe((relatedMovies) => {
        this.relatedMovies = relatedMovies;
      });
    });
  }
}
