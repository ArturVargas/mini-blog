import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog/blog.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  content;
  params;
  loader = true;
  constructor(private actvdRoute: ActivatedRoute, private blogSvc: BlogService) { 
    this.actvdRoute.params.subscribe( params => {
       this.params = params;
    }, (err) => {
        console.log(err);
    })
  }

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    this.blogSvc.getPost(this.params.id)
    .subscribe( data => {
      this.loader = true;
      this.content = data;
      console.log(data);
      this.loader = false;
    }, (err) => {
      console.log(err);
    })
  }
}
