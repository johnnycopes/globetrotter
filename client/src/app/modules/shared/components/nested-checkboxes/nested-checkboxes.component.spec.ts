import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NestedCheckboxesComponent } from './nested-checkboxes.component';

describe('NestedCheckboxesComponent', () => {
  let component: NestedCheckboxesComponent;
  let fixture: ComponentFixture<NestedCheckboxesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedCheckboxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedCheckboxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
