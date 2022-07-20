import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { FormsModule, FormBuilder, ReactiveFormsModule  } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreStub } from 'src/mocks/firestore.mock';
import { environment } from 'src/environments/environment';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthServiceStub } from 'src/mocks/authService.mock';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ RouterTestingModule, FormsModule, ReactiveFormsModule ],
      providers: [
        { provide: AngularFirestore, useValue: FirestoreStub },
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
        { provide: AuthService, useValue: AuthServiceStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
