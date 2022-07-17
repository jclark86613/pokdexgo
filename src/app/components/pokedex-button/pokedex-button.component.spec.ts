import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexButtonComponent } from './pokedex-button.component';

describe('PokedexButtonComponent', () => {
  let component: PokedexButtonComponent;
  let fixture: ComponentFixture<PokedexButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokedexButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedexButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
