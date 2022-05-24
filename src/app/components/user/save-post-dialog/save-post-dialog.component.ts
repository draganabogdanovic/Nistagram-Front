import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/services/post-service/post.service';

@Component({
  selector: 'app-save-post-dialog',
  templateUrl: './save-post-dialog.component.html',
  styleUrls: ['./save-post-dialog.component.scss']
})
export class SavePostDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SavePostDialogComponent>, private postService: PostService,
    private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: { post: any }) { }


  collectionNames: Array<string>;
  collectionName: string;

  ngOnInit(): void {
    this.getCollectionNames();
  }

  getCollectionNames() {
    this.postService.getCollectionNames().subscribe(data => {
      this.collectionNames = data;
    })
  }

  save() {
    if (!this.collectionName) {
      this.snackBar.open("Please enter collection name", "Ok", { duration: 5000 });
      return;
    }

    let savedPost = {
      post_id: this.data.post.id,
      collection_name: this.collectionName
    }

    this.postService.savePost(savedPost).subscribe(data => {
      this.snackBar.open("Post saved", "Ok", { duration: 5000 });
    },
    err => {
      this.snackBar.open("An error has occured", "Ok", { duration: 5000 });
    })
  }

}
