import { TestBed } from '@angular/core/testing';

import { BackendInterceptorInterceptor } from './backend-interceptor.interceptor';

describe('BackendInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BackendInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: BackendInterceptorInterceptor = TestBed.inject(BackendInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
