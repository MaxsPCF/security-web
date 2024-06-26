import { TestBed } from '@angular/core/testing';

import { BusinessuserService } from './businessuser.service';

describe('BusinessuserService', () => {
  let service: BusinessuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
