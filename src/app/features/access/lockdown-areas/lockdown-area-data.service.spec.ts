import { TestBed } from '@angular/core/testing';

import { LockdownAreaDataService } from './lockdown-area-data.service';

describe('DataService', () => {
  let service: LockdownAreaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LockdownAreaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
