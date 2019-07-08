import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { BlogService } from '../../services/blog/blog.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  
  posts;
  loader = true;
  p = 1;
  constructor(private auth: AuthService, private blogSvc: BlogService, private router: Router) {
    this.auth.getUserInfo();
   }

  ngOnInit() {
    this.blogSvc.getAllPosts()
      .subscribe(data => {
        this.loader = true;
        this.posts = data;
        console.log(this.posts);
        this.loader = false;
      }, (err) => {
        console.log(err);
      })
  }

  readPost(postId) {
    this.router.navigate(['/post', postId])
  }

}
