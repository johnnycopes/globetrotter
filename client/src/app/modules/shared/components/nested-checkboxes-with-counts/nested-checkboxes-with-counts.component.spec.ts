import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NestedCheckboxesWithCountsComponent } from './nested-checkboxes-with-counts.component';

describe('NestedCheckboxesWithCountsComponent', () => {
  let component: NestedCheckboxesWithCountsComponent;
  let fixture: ComponentFixture<NestedCheckboxesWithCountsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedCheckboxesWithCountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedCheckboxesWithCountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
