import { TestBed } from '@angular/core/testing';

import { SubmitContactService } from './submit-contact.service';

describe('SubmitContactService', () => {
  let service: SubmitContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmitContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
