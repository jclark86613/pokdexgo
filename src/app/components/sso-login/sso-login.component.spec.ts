import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreStub } from 'src/mocks/firestore.mock';

import { SsoLoginComponent } from './sso-login.component';

describe('SsoLoginComponent', () => {
  let component: SsoLoginComponent;
  let fixture: ComponentFixture<SsoLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsoLoginComponent ],
      providers: [{
        provide: AngularFirestore,
        useValue: FirestoreStub
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
