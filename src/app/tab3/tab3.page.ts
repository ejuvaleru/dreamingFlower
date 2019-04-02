import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { storage } from 'firebase';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  picUrl: any;
  loading;
  constructor(
    private camara: Camera,
    private loadingCrtl: LoadingController,
    private toastCtrl: ToastController) {
  }

  async tomarFoto() {
    //
    try {
      const options: CameraOptions = {
        quality: 80,
        targetHeight: 200,
        targetWidth: 200,
        destinationType: this.camara.DestinationType.DATA_URL,
        encodingType: this.camara.EncodingType.JPEG,
        mediaType: this.camara.MediaType.PICTURE,
        correctOrientation: true
      };

      const res = await this.camara.getPicture(options);

      const image = `data:image/jpeg;base64,${res}`;
      const nombre = Math.random();
      const pictures = storage().ref(`pictures/${nombre}`);
      const loading = await this.loadingCrtl.create({
        message: 'Cargando...'
      });
      await loading.present();
      pictures.putString(image, 'data_url').then(data => {
        const ref = storage().ref(`pictures/${nombre}`);
        const downloadURL = ref.getDownloadURL().then(url => {
          this.picUrl = data.downloadURL;
        });
      });
      this.mensajeError(this.picUrl);
    } catch (err) {
      console.log(err);
      this.mensajeError('error: ' + err);
    }
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
