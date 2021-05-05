import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { TraktService } from 'src/app/services/trakt.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  loading = true;
  movie: Movie;
  constructor(private route: ActivatedRoute, private trakt: TraktService) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.params['id'];
    const type = this.route.snapshot.params['type'];
    this.trakt.getMovieDetails(type, slug).subscribe((movie: Movie) => {
      this.movie = movie;
      console.log('this movie', this.movie);
      this.loading = false;
    });
  }
}
