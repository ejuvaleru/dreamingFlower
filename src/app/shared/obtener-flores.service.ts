import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ObtenerFloresService {
  floreriasRef: AngularFireList<any[]>;
  public token = 'string';
  private cart = [];

  constructor(private http: HttpClient, // Referencia al Módulo de FirebaseDatabase
    private db: AngularFireDatabase) { }

  obtenerFlores() {
    return this.http.get('https://dreamflowers-65edb.firebaseio.com/.json');
  }

  obtenerFlores2() {
    this.floreriasRef = this.db.list('florerias/');
    console.log(this.floreriasRef);
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

  // Obtener lista de tours
  getFloreriasList() {
    this.floreriasRef = this.db.list('florerias/');
    return this.floreriasRef;
  }
}
