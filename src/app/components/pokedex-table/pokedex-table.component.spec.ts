import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexTableComponent } from './pokedex-table.component';

describe('PokedexTableComponent', () => {
  let component: PokedexTableComponent;
  let fixture: ComponentFixture<PokedexTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokedexTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedexTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
