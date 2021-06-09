import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import {SwPush} from '@angular/service-worker';
// import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // isAuthenticated = false;
  userSub: Subscription;
  public readonly VAPID_PUBLIC_KEY = 'BAS8vsVukbdt3lOp-9UR2F4Mp_8B5a6QxJYT3qYYz1pBe9DWu3LJW8EM_PGantX6yDyRwJ53UbX_1J8JCGXxS-A';

  constructor(public auth: AuthService, private router: Router, private swPush: SwPush) {
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

  // constructor(private authService: AuthService) { }
  ngOnInit(): void {
    /*this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });*/
    this.subscribeToNotifications();
  }
}
