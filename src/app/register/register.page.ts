import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'; // Import de afAuth
import { User } from '../shared/user'; // Interfaz de usuario
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {} as User;

  constructor(
    private auth: AuthenticationService,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public router: Router) { }

  ngOnInit() {
  }

  register(user: User) {
    this.auth.register(user).then(res =>
      this.router.navigateByUrl('/app/tabs/tab1')
    ).catch(err => this.mensajeError('' + err));
  }

  // Toast de mensaje en caso de error (user not found, password incorrect)
  async mensajeError(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'Ok',
    });
    toast.present();
  }
}
