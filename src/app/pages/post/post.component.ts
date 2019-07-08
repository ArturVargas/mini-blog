import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog/blog.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  content = [];
  loader = true;
  constructor(private actvdRoute: ActivatedRoute, private blogSvc: BlogService) { 
    this.actvdRoute.params.subscribe( params => {
       this.getPost(params.id);
    }, (err) => {
        console.log(err);
    })
  }

  ngOnInit() {
    
  }

  getPost(id) {
    this.blogSvc.getPost(id)
    .subscribe( data => {
      this.loader = true;
      this.content.push(data);
      console.log(data);
      this.loader = false;
    }, (err) => {
      console.log(err);
    })
  }
}
