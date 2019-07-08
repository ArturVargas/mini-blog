import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SVC } from '../../config/config';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
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

  newComment(comment, postId){
    const url = URL_SVC + 'new/comment/' + postId;
    console.log(comment);
    return this.http.post(url, comment, this.httpOptions)
      .subscribe(res => {
        Swal.fire({
          type: 'success',
          title: 'El comentario se creo correctamente',
          showConfirmButton: false,
          timer: 2000 
        });
        this.router.navigate(['/post', postId]);
      }, (err) => {
        Swal.fire({
          type: 'error',
          title: 'Ocurrio un Error!',
          showConfirmButton: false,
          timer: 2000 
        })
      })
  }

}
