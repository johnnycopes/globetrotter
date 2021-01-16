import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FixedSlideablePanelComponent } from './fixed-slideable-panel.component';

describe('FixedSlideablePanelComponent', () => {
  let component: FixedSlideablePanelComponent;
  let fixture: ComponentFixture<FixedSlideablePanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedSlideablePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedSlideablePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
