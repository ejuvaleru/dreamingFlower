import { Injectable } from '@angular/core';
import { User } from './user';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth) { }

  // Método de login
  login(user: User) {
    return new Promise((resolve, rejected) => {
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(user => {
        resolve(user);
      }).catch(err => rejected(err));
    });
  }

  // Método de register
  register(user: User) {
    return new Promise((resolve, rejected) => {
      this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(user => {
        resolve(user);
      }).catch(err => rejected(err));
    });
  }
}
