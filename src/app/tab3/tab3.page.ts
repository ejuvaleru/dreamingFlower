import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { storage } from 'firebase';
import { LoadingController, ToastController } from '@ionic/angular';
import { FileUpload } from '../shared/FileUpload';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  picUrl: any;
  loading;
  fileupload: FileUpload;
  images: FileUpload[];
  constructor(
    private camara: Camera,
    private loadingCrtl: LoadingController,
    private toastCtrl: ToastController,
    private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    const m = this.getFileUploads();
    m.snapshotChanges().subscribe(data => {
      this.images = [];
      data.forEach(item => {
        const a = item.payload.toJSON();
        a['$key'] = item.key;
        this.images.push(a as FileUpload);
        console.log(this.images);
      });
  });
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
        const downloadURL = pictures.getDownloadURL().then(url => {
          this.picUrl = url;
          this.fileupload = new FileUpload(url);
          this.saveFileData(this.fileupload);
          console.log(this.picUrl);
          this.mensajeError('algo pasó, no hay url pero subí la foto' + this.picUrl);
        });

        loading.dismiss();
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
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'Ok',
    });
    toast.present();
  }

  private saveFileData(fileUpload: FileUpload) {
    console.log(fileUpload.urlImage);
    this.db.list(`images/`).push(fileUpload);
  }

    // obtener archivos
    getFileUploads(): AngularFireList<any> {
      return this.db.list(`images/`);
    }
}
