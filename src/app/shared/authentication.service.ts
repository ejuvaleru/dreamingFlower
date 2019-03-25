import { Injectable } from '@angular/core';
import { User } from './user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  // Método de login
  login(user: User) {
    return new Promise((resolve, rejected) => {
      // tslint:disable-next-line:no-shadowed-variable
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(user => {
        resolve(user);
      }).catch(err => rejected(err));
    });
  }

  // Método de register
  register(user: User) {
    return new Promise((resolve, rejected) => {
      // tslint:disable-next-line:no-shadowed-variable
      this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(user => {
        resolve(user);
      }).catch(err => rejected(err));
    });
  }

  // Logout
  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }

  getDetalles() {
    this.afAuth.user.subscribe(data => {
      console.log(data);
    });
  }
}
