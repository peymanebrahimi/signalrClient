import { TestBed } from '@angular/core/testing';

import { ReceivedService } from './received.service';

describe('ReceivedService', () => {
  let service: ReceivedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceivedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
