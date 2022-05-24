import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoryService } from 'src/app/services/story-service/story.service';

@Component({
  selector: 'app-story-report-dialog',
  templateUrl: './story-report-dialog.component.html',
  styleUrls: ['./story-report-dialog.component.scss']
})
export class StoryReportDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<StoryReportDialogComponent>, private storyService: StoryService, private dialog: MatDialog,
    private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: { storyId: any }) { }

  description: string;

  ngOnInit(): void {
  }

  report() {
    let report = {
      story_id: this.data.storyId,
      description: this.description
    }
    
    this.storyService.reportStory(report).subscribe(data => {
      this.snackBar.open("Report submitted.", "Ok", { duration: 5000 });
      this.dialogRef.close();
    },
      err => {
        console.log(err.error);
      })
  }

}
