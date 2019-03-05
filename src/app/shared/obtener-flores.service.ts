import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ObtenerFloresService {

  private cart = [];

  constructor(private http: HttpClient, private storage: Storage) { }

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
    console.log(this.cart.length);
  }


  deleteProducts(id:number) {
    console.log(id);
    for(var i=0; i<this.cart.length; i++){
      if(this.cart[i]['id']==id) {
        this.cart.splice(i,1);
        break;
      }
    }
  }

  deleteProduct(id: number) {
    console.log(this.cart)
    console.log(id)


    this.cart.splice(id, 1);
  }
}
