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


const fakeUser = null;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signup(username: string, password: string) {
    // this.http.post(`http://localhost:3443/users/signup`, {
    //   username,
    //   password
    // }).subscribe(console.log);
    // this.user.next(fakeUser);
    // this.router.navigate(['/homepage']);

    return this.http
      .post<AuthResponseData>(
        'http://movies-and-fun-backend.herokuapp.com/',
        {
          username,
          password,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(console.log)
      );
  }

  signin(username: string, password: string) {
    this.user.next(fakeUser);
    this.router.navigate(['/homepage']);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/homepage']);
  }

  autoLogin() {}

  autoLogout(expirationDuration: number) {}

  // private handleAuthentication(
  //   email: string,
  //   userId: string,
  //   token: string,
  //   expiresIn: number
  // ) {
  //   const user = new User(email, userId, token, expirationDate);
  //   this.user.next(user);
  //   localStorage.setItem('userData', JSON.stringify(user));
  // }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    console.log('error', errorRes);
    if (!errorRes.error?.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {

    }
    return throwError(errorMessage);
  }
}
