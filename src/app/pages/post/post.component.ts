import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog/blog.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  content = [];
  loader = true;
  postId;
  commentsForm: FormGroup;
  constructor(private actvdRoute: ActivatedRoute, private blogSvc: BlogService,
              private router: Router) { 
    this.actvdRoute.params.subscribe( params => {
      this.postId = params.id;
       this.getPost(params.id);
    }, (err) => {
      Swal.fire({
        type: 'error',
        title: 'Error!',
        text: err.error.error,
        showConfirmButton: false,
        timer: 2000  
      });
    })
  }

  ngOnInit() {
    this.commentsForm = new FormGroup({
      body: new FormControl('', [Validators.required, Validators.minLength(5)])
    })
  }

  getPost(id) {
    this.blogSvc.getPost(id)
    .subscribe( data => {
      this.loader = true;
      this.content.push(data);
      console.log(data);
      this.loader = false;
    }, (err) => {
      Swal.fire({
        type: 'error',
        title: 'Error!',
        text: err.error.error,
        showConfirmButton: false,
        timer: 2000  
      });
      this.router.navigate(['/blog']);
    })
  }

  sendComment() {
    if(this.commentsForm.invalid){return;}
    this.blogSvc.newComment(this.commentsForm.value, this.postId);
    this.commentsForm.reset()
  }
}
