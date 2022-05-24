import { A } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoryService } from 'src/app/services/story-service/story.service';

@Component({
  selector: 'app-highlight-dialog',
  templateUrl: './highlight-dialog.component.html',
  styleUrls: ['./highlight-dialog.component.scss']
})
export class HighlightDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<HighlightDialogComponent>, private storyService: StoryService,
    private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: { story: any }) { }


  highlightNames: Array<string>;
  highlightName: string;

  ngOnInit(): void {
    this.getHighlightNames();
  }

  getHighlightNames() {
    this.storyService.getStoryHighlightNames().subscribe(data => {
      this.highlightNames = data;
    })
  }

  highlight() {
    if (!this.highlightName) {
      this.snackBar.open("Please enter highlight collection name", "Ok", { duration: 5000 })
      return;
    }

    let highlight = {
      story_id: this.data.story.id,
      highlight_name: this.highlightName
    }

    this.storyService.highlightStory(highlight).subscribe(data => {
      this.snackBar.open("Highlight created", "Ok", { duration: 5000 })
    },
      err => {
        this.snackBar.open("An error has occured", "Ok", { duration: 5000 });
      })
  }

}
