import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePostDialogComponent } from './save-post-dialog.component';

describe('SavePostDialogComponent', () => {
  let component: SavePostDialogComponent;
  let fixture: ComponentFixture<SavePostDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavePostDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavePostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
