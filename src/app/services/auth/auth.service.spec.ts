import { TestBed } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';
import { environment } from 'src/environments/environment';
import { mockAngularFireAuth } from 'src/mocks/authService.mock';
import { FirestoreStub } from 'src/mocks/firestore.mock';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
          { provide: AngularFirestore, useValue: FirestoreStub },
          { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
          { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        ],
        imports: [
            RouterTestingModule.withRoutes(routes)
        ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
