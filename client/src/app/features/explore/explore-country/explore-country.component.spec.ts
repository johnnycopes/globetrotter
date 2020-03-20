import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreCountryComponent } from './explore-country.component';

describe('ExploreCountryComponent', () => {
  let component: ExploreCountryComponent;
  let fixture: ComponentFixture<ExploreCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
