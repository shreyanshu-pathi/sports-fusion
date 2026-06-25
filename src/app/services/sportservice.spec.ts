import { TestBed } from '@angular/core/testing';

import { Sportservice } from './sportservice';

describe('Sportservice', () => {
  let service: Sportservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sportservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
