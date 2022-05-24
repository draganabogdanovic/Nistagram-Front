import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post-service/post.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private postService: PostService) { }

  search: string;
  query: string;
  users: Array<any>;
  postsByLocation: Array<any>;
  postsByTags: Array<any>;

  ngOnInit(): void {
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  clear() {
    this.users = null;
    this.postsByLocation = null;
    this.postsByTags = null;
  }

  handleKeyDown(event: any) {
    if (event.keyCode == 13) {
      if (this.search) {
        this.clear();
        switch (this.search) {
          case 'users':
            this.searchUsers()
            break;
          case 'tags':
            this.searchPostsByTags();
            break;

          case 'locations':
            this.searchPostsByLocation();
            break
        }
      }
    }
  }

  searchUsers() {
    if (this.query) {
      this.userService.search(this.query).subscribe(data => {
        this.users = data;
      })
    }
  }

  searchPostsByLocation() {
    if (this.query) {
      this.postService.searchPostsByLocation(this.query).subscribe(data => {
        this.postsByLocation = data;
      })
    }
  }

  searchPostsByTags() {
    if (this.query) {
      this.postService.searchPostsByTags(this.query).subscribe(data => {
        this.postsByTags = data;
      })
    }
  }
}
