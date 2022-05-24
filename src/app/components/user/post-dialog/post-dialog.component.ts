import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/services/post-service/post.service';
import { PostReportDialogComponent } from '../post-report-dialog/post-report-dialog.component';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})
export class PostDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PostDialogComponent>, private postService: PostService, private dialog: MatDialog,
    private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: { post: any }) { }

  comments: Array<any> = [];
  commentText: string;

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.postService.getComments(this.data.post.id).subscribe(data => {
      this.comments = data;
      console.log(data);
    },
      err => {
        console.log(err.error)
      })
  }

  options = {
    items: 1,
    dots: true,
    nav: true,
    navText: ["<i class='fas fa-chevron-circle-left nav'></i>", "<i class='fas fa-chevron-circle-right nav'></i>"],
    mouseDrag: false
  }

  postComment() {
    var comment = {
      post_id: this.data.post.id,
      content: this.commentText
    }

    this.postService.postComment(comment).subscribe(data => {
      this.snackBar.open('Comment posted successfully.', 'Ok', { duration: 5000 })
      this.getComments();
    })
  }

  review(status: number) {
    let review_status;
    if (status == this.data.post.review_status) {
      review_status = 2;
    } else {
      review_status = status;
    }

    var review = {
      post_id: this.data.post.id,
      review_status: review_status
    }

    this.postService.reviewPost(review).subscribe(data => {
      this.updateStatus(review.review_status)
      let message;
      if (review_status == 0) {
        message = 'Post disliked.';
      } else if (review_status == 1) {
        message = 'Post liked.';
      } else {
        message = 'Review removed.';
      }
      this.data.post.review_status = review.review_status;
      this.updateIcons(review_status);
      this.snackBar.open(message, 'Ok', { duration: 5000 })
    },
      err => {
        console.log(err.error);
      })
  }

  updateStatus(status: number) {
    if (this.data.post.review_status == 0) {
      if (status == 0) {
        return;
      }
      if (status == 1) {
        this.data.post.number_of_likes++;
        this.data.post.number_of_dislikes--;
      }
      if (status == 2) {
        this.data.post.number_of_dislikes--;
      }
    }

    if (this.data.post.review_status == 1) {
      if (status == 0) {
        this.data.post.number_of_likes--;
        this.data.post.number_of_dislikes++;
      }
      if (status == 1) {
        return;
      }
      if (status == 2) {
        this.data.post.number_of_likes--;
      }
    }

    if (this.data.post.review_status == 2) {
      if (status == 0) {
        this.data.post.number_of_dislikes++;
      }
      if (status == 1) {
        this.data.post.number_of_likes++;
      }
      if (status == 2) {
        return;
      }
    }
  }

  updateIcons(status: number) {
    if (status == 0) {
      document.getElementById("like-icon").style.color = "#000000";
      document.getElementById("dislike-icon").style.color = "#ed4956";
      return
    }
    if (status == 1) {
      document.getElementById("like-icon").style.color = "#ed4956";
      document.getElementById("dislike-icon").style.color = "#000000";
      return
    }
    if (status == 2) {
      document.getElementById("like-icon").style.color = "#000000";
      document.getElementById("dislike-icon").style.color = "#000000";
      return
    }

  }

  focusComment() {
    document.getElementById("comment-textarea").focus();
  }
  report() {
    this.dialog.open(PostReportDialogComponent, {
      data: {
        postId: this.data.post.id
      },
      height: '200px',
      width: '300px'
    });
  }

  isContentVideo(content: string) {
    let parts = content.split(".")
    console.log(parts[parts.length - 1] == "mp4")
    return parts[parts.length - 1] == "mp4"
  }
}
