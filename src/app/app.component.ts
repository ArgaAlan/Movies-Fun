import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { RecommenderService } from './services/recommender.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router, private recommender: RecommenderService) { }

  // tslint:disable-next-line:typedef
  loginWithRedirect(){
    this.auth.loginWithRedirect();
  }

  // tslint:disable-next-line:typedef
  goToProfile(){
    this.router.navigate(['/profile']).then(r => {});
  }

  ngOnInit() {
  }
}
