import { Component, Injectable, OnInit } from '@angular/core';
import { ObtenerFloresService } from '../shared/obtener-flores.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

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
  constructor(public service: ObtenerFloresService, public router: Router) {
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
