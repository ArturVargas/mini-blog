import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SVC } from '../../config/config';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = '';

  constructor(public http: HttpClient, public router: Router) { }
  
  uploadStorage() {
    this.token = localStorage.getItem('token');
    if(this.token === null) {
      this.token = '';
    }
  }

  login(user: User) {
    const url = URL_SVC + 'login';
    return this.http.post(url, user)
      .subscribe( (res:any) => {
        if(res.token) {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/blog'])
        }
      }, (err) => {
        console.log(err);
      })
  };

  newUser(user: User) {
    const url = URL_SVC + 'signup';
    return this.http.post( url, user)
      .subscribe( res => {
        console.log(res);
      }, (err) => {
        console.log(err);
      })
  };

  getUserInfo() {
    const url = URL_SVC + 'user';
    return this.http.get(url)
      .subscribe( res => {
        console.log(res);
      }, (err) => {
        console.log(err);
      })
  };

  isLogged() {
    this.uploadStorage();
    return(this.token.length > 10) ? true : false;
  }

}

