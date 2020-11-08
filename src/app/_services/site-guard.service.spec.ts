import { TestBed } from '@angular/core/testing';

import { SiteGuardService } from './site-guard.service';

describe('SiteGuardService', () => {
  let service: SiteGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
