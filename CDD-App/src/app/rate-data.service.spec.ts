import { TestBed } from '@angular/core/testing';

import { RateDataService } from './rate-data.service';

describe('RateDataService', () => {
  let service: RateDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RateDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
