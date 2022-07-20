import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthServiceStub, mockAngularFireAuth } from 'src/mocks/authService.mock';
import { FirestoreStub } from 'src/mocks/firestore.mock';

import { PokedexFiltersComponent } from './pokedex-filters.component';

describe('PokedexFiltersComponent', () => {
  let component: PokedexFiltersComponent;
  let fixture: ComponentFixture<PokedexFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokedexFiltersComponent ],
      providers: [{
        provide: AngularFirestore,
        useValue: FirestoreStub
      },
      { provide: AngularFireAuth, useValue: mockAngularFireAuth },
      { provide: AuthService, useValue: AuthServiceStub }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedexFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
