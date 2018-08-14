import { TestBed, inject } from '@angular/core/testing';

import { NestedCheckboxesGroupService } from './nested-checkboxes-group.service';

describe('NestedCheckboxesGroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NestedCheckboxesGroupService]
    });
  });

  it('should be created', inject([NestedCheckboxesGroupService], (service: NestedCheckboxesGroupService) => {
    expect(service).toBeTruthy();
  }));
});
