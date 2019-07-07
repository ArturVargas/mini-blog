import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SVC } from '../../config/config';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(public http: HttpClient, public router: Router) { }

  getAllPosts() {
    const url = URL_SVC + 'posts';
    return this.http.get(url)
  };

  getPost(id){
    const url = URL_SVC + `post/${id}`;
    return this.http.get(url);
  }

}
