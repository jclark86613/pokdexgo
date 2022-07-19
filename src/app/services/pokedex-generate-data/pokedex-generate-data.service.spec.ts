import { TestBed } from '@angular/core/testing';

import { PokedexGenerateDataService } from './pokedex-generate-data.service';

describe('PokedexGenerateDataService', () => {
  let service: PokedexGenerateDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokedexGenerateDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
