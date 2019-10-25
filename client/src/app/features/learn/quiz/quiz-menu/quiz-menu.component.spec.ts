import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizMenuComponent } from './quiz-menu.component';

describe('QuizMenuComponent', () => {
  let component: QuizMenuComponent;
  let fixture: ComponentFixture<QuizMenuComponent>;

  beforeEach(async(() => {
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
