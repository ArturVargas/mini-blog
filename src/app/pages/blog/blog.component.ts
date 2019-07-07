import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog/blog.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  
  posts;

  constructor(private blogSvc: BlogService, private router: Router) { }

  ngOnInit() {
    this.blogSvc.getAllPosts()
      .subscribe(data => {
        this.posts = data;
        console.log(this.posts);
      }, (err) => {
        console.log(err);
      })
  }

  readPost(postId) {
    this.router.navigate(['/post', postId])
  }

}
