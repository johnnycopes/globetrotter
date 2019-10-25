import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedCheckboxesComponent } from './nested-checkboxes.component';

describe('NestedCheckboxesComponent', () => {
  let component: NestedCheckboxesComponent<any>;
  let fixture: ComponentFixture<NestedCheckboxesComponent<any>>;

  beforeEach(async(() => {
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
