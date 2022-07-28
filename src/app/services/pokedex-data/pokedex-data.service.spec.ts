import { TestBed } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { FirestoreStub } from 'src/mocks/firestore.mock';
import { RouterTestingModule } from "@angular/router/testing";

import { AuthService } from '../auth/auth.service';
import { AuthServiceStub, mockAngularFireAuth } from 'src/mocks/authService.mock';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { PokedexDataService } from './pokedex-data.service';

describe('PokedexDataService', () => {
  let service: PokedexDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([
            { path: 'login', component: LoginComponent }
          ])
      ],
        providers: [
          { provide: AngularFirestore, useValue: FirestoreStub },
          { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
          { provide: AngularFireAuth, useValue: mockAngularFireAuth },
          { provide: AuthService, useValue: AuthServiceStub }
        ]
    });
    service = TestBed.inject(PokedexDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
