import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SmallCapsContentComponent } from './small-caps-content.component';

describe('SmallCapsContentComponent', () => {
  let component: SmallCapsContentComponent;
  let fixture: ComponentFixture<SmallCapsContentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallCapsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallCapsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
