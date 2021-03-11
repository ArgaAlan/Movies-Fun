import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  searchEntry: string;
  submitted = false;
  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    // Search
    // this.api.post(form.value.search);
    console.log(form.value.search);
    this.submitted = true;
  }
}
