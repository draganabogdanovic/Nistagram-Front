import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveVerificationComponent } from './approve-verification.component';

describe('ApproveVerificationComponent', () => {
  let component: ApproveVerificationComponent;
  let fixture: ComponentFixture<ApproveVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
