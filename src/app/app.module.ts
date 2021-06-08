import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { ProfileDetailComponent } from './pages/profile-detail/profile-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    MovieDetailComponent,
    ProfileDetailComponent,
    LoginComponent,
    SignUpComponent,
    SpinnerComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'dev-e8nvli2n.us.auth0.com',
      clientId: 'xjxaMzITgZJzvV0yN6tOggP6IHgGT76B',
      cacheLocation: 'localstorage',
      useRefreshTokens: true
    })],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
