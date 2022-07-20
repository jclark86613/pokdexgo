import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { FirestoreStub } from 'src/mocks/firestore.mock';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { mockAngularFireAuth } from 'src/mocks/authService.mock';

describe('IsAuthenticatedGuard', () => {
  let guard: IsAuthenticatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            { provide: AngularFirestore, useValue: FirestoreStub },
            { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
            { provide: AngularFireAuth, useValue: mockAngularFireAuth }
        ],
        imports: [ RouterTestingModule ]
    });
    guard = TestBed.inject(IsAuthenticatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
