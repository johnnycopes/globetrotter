import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallCapsContentComponent } from './small-caps-content.component';

describe('SmallCapsContentComponent', () => {
  let component: SmallCapsContentComponent;
  let fixture: ComponentFixture<SmallCapsContentComponent>;

  beforeEach(async(() => {
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
