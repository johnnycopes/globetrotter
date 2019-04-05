import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNestedCheckboxesGroupComponent } from './new-nested-checkboxes-group.component';

describe('NewNestedCheckboxesGroupComponent', () => {
  let component: NewNestedCheckboxesGroupComponent;
  let fixture: ComponentFixture<NewNestedCheckboxesGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewNestedCheckboxesGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNestedCheckboxesGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
