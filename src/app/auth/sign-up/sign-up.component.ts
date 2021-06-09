import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  isLoading = false;
  error = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signup() {

  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;


    const auth$ = this.authService.signup(email, password);


    auth$.subscribe(
      (resData) => {
        this.isLoading = false;
        this.router.navigate(['/homepage']);
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }

}
