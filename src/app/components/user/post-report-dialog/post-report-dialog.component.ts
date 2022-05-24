import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/services/post-service/post.service';

@Component({
  selector: 'app-post-report-dialog',
  templateUrl: './post-report-dialog.component.html',
  styleUrls: ['./post-report-dialog.component.scss']
})
export class PostReportDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PostReportDialogComponent>, private postService: PostService,
    private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: { postId: any }) { }

  description: string;

  ngOnInit(): void {
  }

  report() {
    let report = {
      post_id: this.data.postId,
      description: this.description
    }

    this.postService.reportPost(report).subscribe(data => {
      this.snackBar.open("Report submitted.", "Ok", { duration: 5000 });
      this.dialogRef.close();
    },
      err => {
        console.log(err.error);
      })
  }
}
