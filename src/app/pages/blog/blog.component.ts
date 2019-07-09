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
  countries;
  loader = true;
  p = 1;
  allPosts;
  searchUser;
  searchCountry;
  searchDate;
  constructor(private auth: AuthService, private blogSvc: BlogService, private router: Router) {
    this.auth.getUserInfo();
    this.getCountries();
   }

  ngOnInit() {
    this.blogSvc.getAllPosts()
      .subscribe(data => {
        console.log(data);
        this.loader = true;
        this.posts = data;
        this.allPosts = data;
        this.loader = false;
      }, (err) => {
        console.log(err);
      })
  }

  getCountries() {
    this.auth.getAllCountries()
      .subscribe(countries => {
        this.countries = this.auth.countriesList;
      })
  }

  searchByUser(event) {
    let user = event.target.value
    user = user.charAt(0).toUpperCase() + user.slice(1);
    this.searchUser = this.posts.filter( (userPost) => {
       return userPost.userHandle == user
    })
    if(this.searchUser.length > 0) {
      this.posts = this.searchUser;
    } else {
      this.posts = this.allPosts;
    }
  }

  searchByCountry(event){
    let pais = event.target.value;
    this.searchCountry = this.posts.filter( (location) => {
      return location.location == pais
    });
    if(this.searchCountry.length > 0) {
      this.posts = this.searchCountry;
    } else {
      this.posts = this.allPosts;
    }
  }

  readPost(postId) {
    this.router.navigate(['/post', postId])
  }

}
