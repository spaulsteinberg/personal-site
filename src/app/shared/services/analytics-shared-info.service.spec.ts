import { TestBed } from '@angular/core/testing';

import { AnalyticsSharedInfoService } from './analytics-shared-info.service';

describe('AnalyticsSharedInfoService', () => {
  let service: AnalyticsSharedInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalyticsSharedInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
