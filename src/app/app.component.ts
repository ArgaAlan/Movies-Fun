import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import {SwPush} from '@angular/service-worker';
import { RecommenderService } from './services/recommender.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // isAuthenticated = false;
  userSub: Subscription;
  public readonly VAPID_PUBLIC_KEY = 'BAS8vsVukbdt3lOp-9UR2F4Mp_8B5a6QxJYT3qYYz1pBe9DWu3LJW8EM_PGantX6yDyRwJ53UbX_1J8JCGXxS-A';

  constructor(public auth: AuthService, private router: Router, private swPush: SwPush, private recommender: RecommenderService) {
    this.subscribeToNotifications();
  }

  subscribeToNotifications(): any {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    }).then(sub => {
      const token = JSON.parse(JSON.stringify(sub));
      console.log('****** ESPAÑOLETE DICIENDO OJO ******', token);
    });
  }

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
