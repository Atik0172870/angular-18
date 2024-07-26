import { TestBed } from '@angular/core/testing';

import { OperatorService } from './operators.service';

describe('OperatorsService', () => {
  let service: OperatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
