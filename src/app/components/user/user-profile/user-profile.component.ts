import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PostService } from 'src/app/services/post-service/post.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { StoryService } from 'src/app/services/story-service/story.service';
import { StoryDialogComponent } from '../story-dialog/story-dialog.component';
import { HighlightDialogComponent } from '../highlight-dialog/highlight-dialog.component';
import { SavePostDialogComponent } from '../save-post-dialog/save-post-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService: UserService, private postService: PostService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private dialog: MatDialog,
    private storyService: StoryService) { }

  postUploadForm: FormGroup;
  storyUploadForm: FormGroup;

  public posts: Array<any>;
  public liked_posts: Array<any>;
  public disliked_posts: Array<any>;
  public allStories: Array<any>;
  public stories: Array<any>;
  public highlights: Array<any>;
  public savedPosts: Array<any>;
  public userProfileInfo: any;
  postFiles: string[] = [];
  storyFiles: string[] = [];
  tags: string[] = [];
  locations: Array<any>;
  locationSearch = new FormControl();
  location: any = null;

  tagCtrl = new FormControl();
  separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  @ViewChild('tagInput') fruitInput: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.getPosts();
    this.getAllStories();
    this.getStories();
    this.getHighlights();
    this.getUserProfileInfo();
    this.postUploadForm = this.formBuilder.group({
      media: new FormControl(),
      description: new FormControl()
    })
    this.storyUploadForm = this.formBuilder.group({
      media: new FormControl(),
      closeFriendsOnly: new FormControl()
    })
  }

  tabChanged(event: MatTabChangeEvent) {
    if (event.index == 0) {
      this.getPosts();
      return;
    }
    if (event.index == 1) {
      this.getLikedPosts();
      return;
    }
    if (event.index == 2) {
      this.getDislikedPosts();
      return;
    }
    if (event.index == 3) {
      this.getSavedPosts();
      return;
    }
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

  getAllStories() {
    this.storyService.getAllStories().subscribe(data => {
      this.allStories = data;
    },
      err => {
        console.log(err.error)
      })
  }

  getDislikedPosts() {
    this.postService.getDislikedPosts().subscribe(data => {
      this.disliked_posts = data;
    },
      err => {
        console.log(err.error)
      })
  }

  getStories() {
    this.storyService.getStories().subscribe(data => {
      this.stories = data;
    })
  }

  getHighlights() {
    this.storyService.getStoryHighlights().subscribe(data => {
      this.highlights = data;
    })
  }

  getSavedPosts() {
    this.postService.getSavedPosts().subscribe(data => {
      this.savedPosts = data;
    })
  }

  getUserProfileInfo() {
    this.userService.getUserProfileInfo().subscribe(data => {
      this.userProfileInfo = data;
    },
      err => {
        console.log(err.error);
      })
  }

  onFileSelectPost(event) {
    this.postFiles.splice(0, this.postFiles.length)
    const file_form = this.postUploadForm.get('media').value;
    for (var i = 0; i < file_form.length; i++) {
      this.postFiles.push(file_form[i]);
    }
  }

  onFileSelectStory(event) {
    this.storyFiles.splice(0, this.storyFiles.length)
    const file_form = this.storyUploadForm.get('media').value;
    for (var i = 0; i < file_form.length; i++) {
      this.storyFiles.push(file_form[i]);
    }
  }

  onSubmitPost() {
    const formData = new FormData();

    if (this.postFiles.length < 1) {
      this.snackBar.open('No files selected.', 'Ok', { duration: 5000 });
      return;
    }

    if (this.postFiles.length > 10) {
      this.snackBar.open('Maximum number of files is 10.', 'Ok', { duration: 5000 });
      return;
    }

    for (var i = 0; i < this.postFiles.length; i++) {
      formData.append("media", this.postFiles[i]);
    }

    if (this.postUploadForm.get('description').value) {
      formData.append("description", this.postUploadForm.get('description').value);
    }

    for (var i = 0; i < this.tags.length; i++) {
      formData.append("tags", this.tags[i]);
    }

    if (this.location) {
      formData.append("location_id", this.location.id)
    }

    this.postService.uploadPost(formData).subscribe(data => {
      this.snackBar.open('Post uploaded successfully.', 'Ok', { duration: 5000 })
    },
      err => {
        console.log(err.error)
      })
  }

  onSubmitStory() {
    const formData = new FormData();

    if (this.storyFiles.length < 1) {
      this.snackBar.open('No files selected.', 'Ok', { duration: 5000 });
      return;
    }

    if (this.storyFiles.length > 10) {
      this.snackBar.open('Maximum number of files is 10.', 'Ok', { duration: 5000 });
      return;
    }

    for (var i = 0; i < this.storyFiles.length; i++) {
      formData.append("media", this.storyFiles[i]);
    }

    let closeFriendsOnly = this.storyUploadForm.get('closeFriendsOnly').value == true ? "1" : "0";

    formData.append("close_friends", closeFriendsOnly)

    this.storyService.uploadStory(formData).subscribe(data => {
      this.snackBar.open('Story uploaded successfully.', 'Ok', { duration: 5000 })
    },
      err => {
        console.log(err.error)
      })
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value && !this.tagContained(value)) {
      this.tags.push(value);
    }

    this.tagCtrl.setValue(null);
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  tagContained(tag: string): boolean {
    return this.tags.includes(tag);
  }

  getLocations() {
    if (this.locationSearch.value.length < 3) {
      if (this.locations != null) {
        this.locations.splice(0, this.locations.length)
      }
      return;
    }

    this.postService.getLocations(this.locationSearch.value).subscribe(data => {
      this.locations = data;
    },
      err => {
        console.log(err.error);
      })
  }

  updateLocation(location: any) {
    this.location = location;
  }

  openPost(post: any) {
    this.dialog.open(PostDialogComponent, {
      data: {
        post: post
      },
      height: '600px',
      width: '950px'
    });
  }

  openStory(story: any) {
    this.dialog.open(StoryDialogComponent, {
      data: {
        story: story,
        multiple: false
      },
      height: '600px',
      width: '600px'
    });
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

  transformHighlights() {
    let map = new Map();
    for (let highlight of this.highlights) {
      if (map.has(highlight.highlight_name)) {
        map.get(highlight.highlight_name).push(highlight);
      } else {
        map.set(highlight.highlight_name, []);
        map.get(highlight.highlight_name).push(highlight);
      }
    }

    let retVal = []

    for (let [key, value] of map) {
      retVal.push({
        highlight_name: key,
        highlights: value
      })
    }
    return retVal;
  }

  openHighlight(highlights: any) {
    let stories = []
    for (let highlight of highlights) {
      stories.push(highlight.story)
    }

    this.dialog.open(StoryDialogComponent, {
      data: {
        story: stories,
        multiple: true
      },
      height: '600px',
      width: '600px'
    });
  }

  openHighlightDialog(event, story) {
    event.preventDefault();
    
    this.dialog.open(HighlightDialogComponent, {
      data : {
        story: story
      },
      height: '200px',
      width: '300px'
    })
  }

  transformSavedPosts() {
    let map = new Map();
    for (let post of this.savedPosts) {
      if (map.has(post.collection_name)) {
        map.get(post.collection_name).push(post);
      } else {
        map.set(post.collection_name, []);
        map.get(post.collection_name).push(post);
      }
    }

    let retVal = []

    for (let [key, value] of map) {
      retVal.push({
        collection_name: key,
        posts: value
      })
    }
    console.log(retVal);
    return retVal;
  }

  openSavePostDialog(event, post) {
    event.preventDefault();

    this.dialog.open(SavePostDialogComponent, {
      data : {
        post: post
      },
      height: '200px',
      width: '300px'
    })
  }
  
  isContentVideo(content: string) {
    let parts = content.split(".")
    console.log(parts[parts.length - 1] == "mp4")
    return parts[parts.length - 1] == "mp4"
  }
}
