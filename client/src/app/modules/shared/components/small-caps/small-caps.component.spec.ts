import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SmallCapsComponent } from './small-caps.component';

describe('SmallCapsComponent', () => {
  let component: SmallCapsComponent;
  let fixture: ComponentFixture<SmallCapsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallCapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallCapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
