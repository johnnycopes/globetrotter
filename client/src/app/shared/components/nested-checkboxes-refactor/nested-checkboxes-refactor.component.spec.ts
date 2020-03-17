import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedCheckboxesRefactorComponent } from './nested-checkboxes-refactor.component';

describe('NestedCheckboxesRefactorComponent', () => {
  let component: NestedCheckboxesRefactorComponent;
  let fixture: ComponentFixture<NestedCheckboxesRefactorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedCheckboxesRefactorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedCheckboxesRefactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
