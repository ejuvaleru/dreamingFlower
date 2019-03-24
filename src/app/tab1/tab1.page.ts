import { Component, Injectable, OnInit } from '@angular/core';
import { ObtenerFloresService } from '../shared/obtener-flores.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { async } from '@angular/core/testing';

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

  respuesta: any;

  constructor(public service: ObtenerFloresService,
    public router: Router,
    public loadingController: LoadingController,
    private afAuth: AngularFireAuth,
  ) {
  }

  ngOnInit() {
    this.cart = this.service.getCart();
    this.service.obtenerRespuesta().subscribe(
      (data) => { this.respuesta = data; console.log(this.respuesta); },
      (error) => { console.log(error); }
    );
  }

  addToCart(flor) {
    this.service.addProduct(flor);
  }

  openCart() {
    this.router.navigate(['cart']);
  }

}
