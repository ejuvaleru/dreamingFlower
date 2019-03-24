import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../shared/authentication.service'; // Servicio de auth
import { User } from '../shared/user'; // Clase usuario
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {} as User; // Objeto de la clase Usuario

  constructor(
    private auth: AuthenticationService,
    public router: Router,
    public toastCtrl: ToastController) { }

  ngOnInit() {
  }

  // Iniciar sesión con el servicio authentication
  signIn(user: User) {
    this.auth.login(user).then(res =>
      this.router.navigateByUrl('/app/tabs/tab1')
    ).catch(err => this.mensajeError('Usuario o contraseña incorrecta.')
    );
  }

  // Toast de mensaje en caso de error (user not found, password incorrect)
  async mensajeError(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
