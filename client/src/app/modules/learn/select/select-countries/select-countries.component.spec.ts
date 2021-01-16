import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectCountriesComponent } from './select-countries.component';

describe('SelectCountriesComponent', () => {
  let component: SelectCountriesComponent;
  let fixture: ComponentFixture<SelectCountriesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
