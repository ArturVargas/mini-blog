import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog/blog.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {
  searchUser;
  searchCountry;
  searchDate;
  constructor(private blogSvc: BlogService) { }

  ngOnInit() {
  }

  searchByUser() {

  }

  searchByCountry(){

  }

  searchByDate(){

  }

}
