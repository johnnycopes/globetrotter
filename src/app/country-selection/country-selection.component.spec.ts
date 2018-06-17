import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrySelectionComponent } from './country-selection.component';

describe('CountrySelectionComponent', () => {
  let component: CountrySelectionComponent;
  let fixture: ComponentFixture<CountrySelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountrySelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
