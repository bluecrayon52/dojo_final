import { TestBed } from '@angular/core/testing';

import { LoginRegService } from './login-reg.service';

describe('LoginRegService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginRegService = TestBed.get(LoginRegService);
    expect(service).toBeTruthy();
  });
});
