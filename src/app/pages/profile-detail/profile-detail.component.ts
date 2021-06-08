import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit, OnDestroy {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {

  }

  // tslint:disable-next-line:typedef
  logout() {
    this.auth.logout();
  }

  // tslint:disable-next-line:typedef
  ngOnDestroy() {

  }

}
