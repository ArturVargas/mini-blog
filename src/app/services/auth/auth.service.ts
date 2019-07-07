import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SVC } from '../../config/config';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = '';
  user: User;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(public http: HttpClient, public router: Router) { }
  
  uploadStorage() {
    this.token = localStorage.getItem('token');
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.token === null) {
      this.token = '';
      this.user = null;
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
    return this.http.post( url, user, this.httpOptions)
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

  logout() {
    this.user = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
  }

  isLogged() {
    this.uploadStorage();
    return(this.token.length > 10) ? true : false;
  }

}

