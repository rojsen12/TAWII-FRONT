import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateLessonComponent } from './rate-lesson.component';

describe('RateLessonComponent', () => {
  let component: RateLessonComponent;
  let fixture: ComponentFixture<RateLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateLessonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
