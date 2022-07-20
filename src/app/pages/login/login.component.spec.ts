import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule, FormBuilder, ReactiveFormsModule  } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { LoginComponent } from './login.component';
import { FirestoreStub } from 'src/mocks/firestore.mock';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { routes } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthServiceStub, mockAngularFireAuth } from 'src/mocks/authService.mock';
import { AngularFireAuth } from '@angular/fire/compat/auth';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent }
        ]),
        FormsModule,
        ReactiveFormsModule
      ],
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
