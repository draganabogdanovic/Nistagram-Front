import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoryReportDialogComponent } from '../story-report-dialog/story-report-dialog.component';

@Component({
  selector: 'app-story-dialog',
  templateUrl: './story-dialog.component.html',
  styleUrls: ['./story-dialog.component.scss']
})
export class StoryDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<StoryDialogComponent>, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: { story: any, multiple: boolean }) { }

  transformedData: any;

  ngOnInit(): void {
    if (this.data.multiple) {
      this.transformData();
    }
  }

  transformData() {
    let newData = {
      stories: []
    }

    for (let story of this.data.story) {
      for (let content of story.content) {
        newData.stories.push({
          id: story.id,
          created_at: story.created_at,
          content: content,
          close_friends_only: story.close_friends_only
        })
      }
      this.transformedData = newData;
    }
  }


  options = {
    items: 1,
    dots: true,
    nav: true,
    navText: ["<i class='fas fa-chevron-circle-left nav'></i>", "<i class='fas fa-chevron-circle-right nav'></i>"],
    mouseDrag: false,
    autoplay: true,
    onInitialized: this.startProgressBar,
    onTranslate: this.resetProgressBar,
    onTranslated: this.startProgressBar
  }

  startProgressBar() {
    document.getElementById('progress-bar').style.cssText = "width: 100%; transition: width 5000ms";
  }
  resetProgressBar() {
    document.getElementById('progress-bar').style.cssText = "width: 0; transition: width 0";
  }

  report(id: any) {
    this.dialog.open(StoryReportDialogComponent, {
      data: {
        storyId: id
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
