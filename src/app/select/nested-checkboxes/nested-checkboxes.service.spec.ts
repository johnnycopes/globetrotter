import { TestBed, inject } from '@angular/core/testing';

import { NestedCheckboxesService } from './nested-checkboxes.service';

describe('NestedCheckboxesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NestedCheckboxesService]
    });
  });

  it('should be created', inject([NestedCheckboxesService], (service: NestedCheckboxesService) => {
    expect(service).toBeTruthy();
  }));
});
