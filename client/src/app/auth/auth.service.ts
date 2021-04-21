import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';

// Auth REST API Response Data for Singup
export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const fakeUser = new User('user1@gmail.com', '2', 'Jon', 'Snow', 'kingofthenorth', '123456', new Date());

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    this.user.next(fakeUser);
  }

  signin(email: string, password: string) {
    this.user.next(fakeUser);
  }

  logout() {
    this.user.next(null);
  }

  autoLogin() {}

  autoLogout(expirationDuration: number) {}

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {}

  private handleError(errorRes: HttpErrorResponse) {}
}
