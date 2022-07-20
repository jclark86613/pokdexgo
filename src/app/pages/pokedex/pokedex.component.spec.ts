import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from "@angular/router/testing";
import { PokedexFiltersComponent } from 'src/app/components/pokedex-filters/pokedex-filters.component';
import { PokedexTableComponent } from 'src/app/components/pokedex-table/pokedex-table.component';
import { environment } from 'src/environments/environment';
import { FirestoreStub } from 'src/mocks/firestore.mock';

import { PokedexComponent } from './pokedex.component';

describe('PokedexComponent', () => {
  let component: PokedexComponent;
  let fixture: ComponentFixture<PokedexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokedexComponent, PokedexTableComponent, PokedexFiltersComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: AngularFirestore, useValue: FirestoreStub },
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
