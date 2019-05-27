import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonScreenComponent } from './button-screen.component';

describe('ButtonScreenComponent', () => {
  let component: ButtonScreenComponent;
  let fixture: ComponentFixture<ButtonScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
