import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryReportDialogComponent } from './story-report-dialog.component';

describe('StoryReportDialogComponent', () => {
  let component: StoryReportDialogComponent;
  let fixture: ComponentFixture<StoryReportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryReportDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
