import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ObtenerFloresService {
  public token = 'string';
  private cart = [];

  floreriasRef: AngularFireList<any>; // Referencia a una lista de tours
  floreriaRef: AngularFireObject<any>; // Referencia a un sólo objeto de tour

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase
  ) { }

  obtenerFlores() {
    return this.http.get('https://dreamflowers-65edb.firebaseio.com/.json');
  }

  // Obtener lista de tours
  getListFlorerias() {
    this.floreriasRef = this.db.list('florerias/');
    console.log('ESTOY AQUI ' + this.floreriasRef);
    return this.floreriasRef;
  }

  getProducts() {
    return this.http;
  }

  getCart() {
    return this.cart;
  }

  setCart() {
    this.cart = null;
  }

  resetCart() {
    this.cart.length = 0;
  }

  addProduct(flor) {
    this.cart.push(flor);
    console.log(this.cart.length);
  }


  deleteProducts(id: number) {
    console.log(id);
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i]['id'] === id) {
        this.cart.splice(i, 1);
        break;
      }
    }
  }

  deleteProduct(id: number) {
    console.log(this.cart);
    console.log(id);
    this.cart.splice(id, 1);
  }

  saveToken(token) {
    this.token = token;
  }
}
