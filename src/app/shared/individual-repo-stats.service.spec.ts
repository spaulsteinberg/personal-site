import { TestBed } from '@angular/core/testing';

import { IndividualRepoStatsService } from './individual-repo-stats.service';

describe('IndividualRepoStatsService', () => {
  let service: IndividualRepoStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndividualRepoStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
