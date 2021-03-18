import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MovieResult } from 'src/app/models/movie.model';
import { TraktService } from 'src/app/services/trakt.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  loading = false;
  searchEntry: string;
  submitted = false;
  relatedMovies: MovieResult[] = [];
  constructor(private trakt: TraktService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    // Search
    this.loading = true;
    this.trakt.getRelatedMovies().subscribe((data: MovieResult[]) => {
      this.loading = false;
      console.log('data', data);
      this.relatedMovies = data;
    });
    this.submitted = true;
  }
}
