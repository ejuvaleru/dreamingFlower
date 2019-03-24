import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ObtenerFloresService } from '../shared/obtener-flores.service';
import { ModalController, NavController } from '@ionic/angular';
import { FormularioPage } from '../formulario/formulario.page';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  selectedItems = [];
  total = 0;

  constructor(private service: ObtenerFloresService, private modalController: ModalController,
    private nav: NavController) { }

  ngOnInit() {
    this.createCart();
  }

  back() {
    this.nav.navigateBack('/app/tabs/tab1');
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

  deleteProduct(id) {
    const index = this.selectedItems.indexOf(id, 1);
    this.selectedItems.splice(id, 1);


    this.service.deleteProducts(id);
    console.log('Eliminando: ', id);
    this.createCart();
  }

  async  pagar() {
    const modal = await this.modalController.create({
      component: FormularioPage,
      componentProps: {
        eltotal: this.total,
        productosS: this.selectedItems
      }
    });
    modal.present();
  }

}
