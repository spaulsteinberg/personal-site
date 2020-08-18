import { TestBed } from '@angular/core/testing';

import { LanguageParseService } from './language-parse.service';

describe('LanguageParseService', () => {
  let service: LanguageParseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageParseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
