import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectQuantityComponent } from './select-quantity.component';

describe('SelectQuantityComponent', () => {
  let component: SelectQuantityComponent;
  let fixture: ComponentFixture<SelectQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectQuantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
