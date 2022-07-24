import { TestBed } from '@angular/core/testing';

import { PokedexTableService } from './pokedex-table.service';

describe('PokedexTableService', () => {
  let service: PokedexTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokedexTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
