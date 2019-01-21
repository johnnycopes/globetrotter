import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectHomeComponent } from './select-home.component';

describe('SelectHomeComponent', () => {
  let component: SelectHomeComponent;
  let fixture: ComponentFixture<SelectHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
