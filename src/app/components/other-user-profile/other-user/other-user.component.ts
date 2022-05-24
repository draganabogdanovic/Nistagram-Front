import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from 'src/app/services/post-service/post.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { StoryDialogComponent } from '../../user/story-dialog/story-dialog.component';

@Component({
  selector: 'app-other-user',
  templateUrl: './other-user.component.html',
  styleUrls: ['./other-user.component.scss']
})
export class OtherUserComponent implements OnInit {

  constructor(private userService: UserService, private postService: PostService, private route: ActivatedRoute, private dialog: MatDialog) { }

  public userProfileInfo: any;
  username: string;

  public posts: Array<any>;
  public liked_posts: Array<any>;
  public disliked_posts: Array<any>;
  public allStories: Array<any>;
  public stories: Array<any>;
  public highlights: Array<any>;
  public savedPosts: Array<any>;
  postFiles: string[] = [];
  storyFiles: string[] = [];
  tags: string[] = [];
  locations: Array<any>;
  locationSearch = new FormControl();
  location: any = null;

  ngOnInit(): void {
    this.getUserProfileInfo();
    this.getLoggedUser();
    this.route.paramMap.subscribe((params: ParamMap) =>{
      this.username = params.get('username')
    })
  }

  getUserProfileInfo() {
    this.route.paramMap.subscribe((params: ParamMap) =>{
      this.username = params.get('username')
    })
    console.log(this.username);
    this.userService.getUserPInfo(this.username).subscribe(data => {
      this.userProfileInfo = data;
    },
      err => {
        console.log(err.error);
      })
  }

  openCurrentStories() {
    if (this.stories.length == 0) {
      return;
    }
    this.dialog.open(StoryDialogComponent, {
      data: {
        story: this.stories,
        multiple: true
      },
      height: '600px',
      width: '600px'
    });
  }

  getPosts() {
    this.postService.getPosts().subscribe(data => {
      this.posts = data;
    },
      err => {
        console.log(err.error)
      })
  }

  getLikedPosts() {
    this.postService.getLikedPosts().subscribe(data => {
      this.liked_posts = data;
    },
      err => {
        console.log(err.error)
      })
  }

  follow(id: string){
    this.userService.followUser(id).subscribe(data =>{
      console.log(data);
    },
    err => {
      console.log(err.error);
    })
  }

  getLoggedUser() {
    this.userService.getUserProfileInfo().subscribe(data => {
      console.log(data);
    },
      err => {
        console.log(err.error);
      })
  }
}
