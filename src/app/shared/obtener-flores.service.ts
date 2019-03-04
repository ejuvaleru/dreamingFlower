import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ObtenerFloresService {

  private cart = [];

  constructor(private http: HttpClient) { }

  obtenerRespuesta() {
    return this.http.get('https://dreamflowers-65edb.firebaseio.com/.json');
  }

  getProducts() {
    return this.http;
  }

  getCart() {
    return this.cart;
  }

  addProduct(flor) {
    this.cart.push(flor);
  }

  deleteProduct(id: number) {
    console.log(this.cart)
    console.log(id)
    this.cart.splice(id, 1);
  }
}
