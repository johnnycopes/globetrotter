import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTableCellComponent } from './info-table-cell.component';

describe('InfoTableCellComponent', () => {
  let component: InfoTableCellComponent;
  let fixture: ComponentFixture<InfoTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoTableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
