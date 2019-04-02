import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { storage } from 'firebase';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  picUrl: any;
  constructor(private camara: Camera,
    public toastCtrl: ToastController) {
  }

  async tomarFoto() {
    //
    try {
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camara.DestinationType.DATA_URL,
        encodingType: this.camara.EncodingType.JPEG,
        mediaType: this.camara.MediaType.PICTURE,
        correctOrientation: true
      };

      const res = await this.camara.getPicture(options);

      const image = `data:image/jpeg;base64,${res}`;
      const nombre = Math.random();
      const pictures = storage().ref(`pictures/${nombre}`);
      pictures.putString(image, 'data_url').then(data => {
        const ref = storage().ref(`pictures/${nombre}`);
        const downloadURL = ref.getDownloadURL().then(url => {
          this.picUrl = data.downloadURL;
        });
      });
      this.mensajeError(this.picUrl);
    } catch (err) {
      console.log(err);
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
