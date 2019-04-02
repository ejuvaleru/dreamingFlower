import { Component, OnInit } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { ObtenerFloresService } from './shared/obtener-flores.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  private florerias: [];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FCM,
    private floresService: ObtenerFloresService,
    public toastCtrl: ToastController
  ) {
    this.initializeApp();
    this.floresService.getFloreriasList();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Notifications
      this.fcm.subscribeToTopic('all');
      this.fcm.getToken().then(token => {
        console.log('aqui voy ');
        this.floresService.token = 'nuevo';
        console.log(token);
        this.floresService.token = token;
        this.mensajeError(this.floresService.token);
      });

      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          console.log('Received in background');
        } else {
          console.log('Received in foreground');
        }
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
      });
      // end notifications.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    console.log(this.floresService.getFloreriasList());
  }

  async mensajeError(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
