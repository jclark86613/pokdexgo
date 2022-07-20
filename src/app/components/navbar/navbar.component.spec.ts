import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FIREBASE_OPTIONS } from 'angularfire2';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { AuthServiceStub, mockAngularFireAuth } from 'src/mocks/authService.mock';
import { FirestoreStub } from 'src/mocks/firestore.mock';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      providers: [
        { provide: AngularFirestore, useValue: FirestoreStub },
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: AuthService, useValue: AuthServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
