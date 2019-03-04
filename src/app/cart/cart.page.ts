import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ObtenerFloresService } from '../shared/obtener-flores.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  selectedItems = [];
  total = 0;

  constructor(private service: ObtenerFloresService) { }

  ngOnInit() {
    this.createCart();
  }

  createCart() {
    const items = this.service.getCart();
    const selected = {};
    for (const obj of items) {
      if (selected[obj.id]) {
        selected[obj.id].count++;
      } else {
        selected[obj.id] = { ...obj, count: 1 };
      }
    }

    this.selectedItems = Object.keys(selected).map(key => selected[key]);
    console.log('items: ', this.selectedItems);
    this.total = this.selectedItems.reduce((a, b) => a + (b.count * b.precio), 0);
  }

  deleteProduct(flor) {
    const index = this.selectedItems.indexOf(flor, 1);
    this.selectedItems.splice(index, flor);
    this.service.deleteProduct(flor);
    console.log('Eliminando: ', flor);
    this.createCart();
  }
}