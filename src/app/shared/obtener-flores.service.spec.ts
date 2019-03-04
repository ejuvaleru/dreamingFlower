import { TestBed } from '@angular/core/testing';

import { ObtenerFloresService } from './obtener-flores.service';

describe('ObtenerFloresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObtenerFloresService = TestBed.get(ObtenerFloresService);
    expect(service).toBeTruthy();
  });
});
