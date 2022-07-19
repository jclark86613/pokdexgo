import { User } from "firebase/auth";
import { BehaviorSubject, Observable, of } from "rxjs";

interface MockUser {
    email: string;
    uid: string;
}

const authState: MockUser = {
  email: '',
  uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2'
};

export const AuthServiceStub = {
  user: new BehaviorSubject<MockUser>(authState)
}


export const mockAngularFireAuth: any = jasmine.createSpy('signInWithEmailAndPassword')
.and.returnValue(Promise.resolve({uid: 'fakeuser'}));
