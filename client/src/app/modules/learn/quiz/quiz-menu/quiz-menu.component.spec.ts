import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuizMenuComponent } from './quiz-menu.component';

describe('QuizMenuComponent', () => {
  let component: QuizMenuComponent;
  let fixture: ComponentFixture<QuizMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
