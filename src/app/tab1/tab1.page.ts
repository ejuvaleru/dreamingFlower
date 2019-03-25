import { Component, Injectable, OnInit } from '@angular/core';
import { ObtenerFloresService } from '../shared/obtener-flores.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ModalController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
@Injectable({
  providedIn: 'root'
})

export class Tab1Page implements OnInit {
  cart = [];
  items = [];
  lat: number;
  long: number;

  respuesta: any;

  constructor(public service: ObtenerFloresService,
    public router: Router,
    private geolocation: Geolocation,
    private modalController: ModalController,
    private loadingCrtl: LoadingController,
  ) {
  }

  ngOnInit() {
    this.cart = this.service.getCart();
    this.getPosition();
    this.cargarFlores();
  }

  async cargarFlores() {
    const loading = await this.loadingCrtl.create({
      message: 'Cargando...'
    });
    await loading.present();

    this.service.obtenerFlores().subscribe(
      (data) => { this.respuesta = data;
        loading.dismiss(); },
      (error) => { console.log(error); }
    );
  }

  addToCart(flor) {
    this.service.addProduct(flor);
  }

  openCart() {
    this.router.navigate(['cart']);
  }

  getPosition(): any {
    const locationOptions = { timeout: 30000, enableHighAccuracy: true };
    this.geolocation.getCurrentPosition(locationOptions).then(response => {
      console.log(response);
      this.lat = response.coords.latitude;
      this.long = response.coords.longitude;
    })
      .catch(error => {
        console.log(error);
      });
  }

}
