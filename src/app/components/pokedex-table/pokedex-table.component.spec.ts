import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthServiceStub, mockAngularFireAuth } from 'src/mocks/authService.mock';
import { FirestoreStub } from 'src/mocks/firestore.mock';

import { PokedexTableComponent } from './pokedex-table.component';

describe('PokedexTableComponent', () => {
  let component: PokedexTableComponent;
  let fixture: ComponentFixture<PokedexTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokedexTableComponent ],
      imports: [ MatIconTestingModule ],
      providers: [{
        provide: AngularFirestore,
        useValue: FirestoreStub
      },
      { provide: AngularFireAuth, useValue: mockAngularFireAuth },
      { provide: AuthService, useValue: AuthServiceStub }]
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
