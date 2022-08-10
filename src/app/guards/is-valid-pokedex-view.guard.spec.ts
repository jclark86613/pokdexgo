import { TestBed } from '@angular/core/testing';

import { IsValidPokedexViewGuard } from './is-valid-pokedex-view.guard';

describe('IsValidPokedexViewGuard', () => {
  let guard: IsValidPokedexViewGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsValidPokedexViewGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
