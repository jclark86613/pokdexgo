import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { PagesService } from './pages.service';

describe('PagesService', () => {
  let service: PagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ]
    });
    service = TestBed.inject(PagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
