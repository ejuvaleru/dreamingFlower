import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { storage } from 'firebase';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  picData: any;
  picUrl: any;
  miPicRef: any;
  constructor(private camara: Camera) {
    this.miPicRef = firebase.storage().ref('/');
  }

  tomarFoto() {
    //
    const options: CameraOptions = {
      quality: 50,
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camara.DestinationType.DATA_URL,
      encodingType: this.camara.EncodingType.JPEG,
      sourceType: this.camara.PictureSourceType.CAMERA,
      mediaType: this.camara.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true
    };

    this.camara.getPicture(options).then(imagedata => {
      this.picData = imagedata;
      this.uploadFoto();
    });
  }

  uploadFoto() {
    this.miPicRef.child(this.uid()).child('pic.jpeg').
      putString(this.picData, 'base64', { contentType: 'image/jpeg' })
      .then(data => {
        this.picUrl = data.downloadURL();
      });
  }

  uid() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
}
