import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HerokuService {

  constructor(private http: HttpClient) { }

  fetchHome(): Observable<any> {
    return this.http.get('http://movies-and-fun-backend.herokuapp.com/', { responseType: 'text' });
  }
}
