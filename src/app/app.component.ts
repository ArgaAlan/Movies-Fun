import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
// import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  // isAuthenticated = false;
  userSub: Subscription;

  constructor(public auth: AuthService, private router: Router) { }

  // tslint:disable-next-line:typedef
  loginWithRedirect(){
    this.auth.loginWithRedirect();
  }

  // tslint:disable-next-line:typedef
  goToProfile(){
    this.router.navigate(['/profile']).then(r => {});
  }

  // constructor(private authService: AuthService) { }

  ngOnInit() {
    /*this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });*/
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
