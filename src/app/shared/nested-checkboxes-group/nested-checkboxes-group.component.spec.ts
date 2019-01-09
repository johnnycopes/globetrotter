import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedCheckboxesGroupComponent } from './nested-checkboxes-group.component';

describe('NestedCheckboxesGroupComponent', () => {
  let component: NestedCheckboxesGroupComponent;
  let fixture: ComponentFixture<NestedCheckboxesGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedCheckboxesGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedCheckboxesGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
