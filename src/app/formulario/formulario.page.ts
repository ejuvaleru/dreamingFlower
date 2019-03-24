import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, LoadingController, NavController } from '@ionic/angular';
import { DatosUsuarioService, DatosEnvio } from '../shared/datos-usuario.service';
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  untotal = null;
  productos: any;
  datosEnvio: DatosEnvio;
  constructor(private navParams: NavParams, private modalController: ModalController,
    private loadingCrtl: LoadingController, private nav: NavController, private service: DatosUsuarioService) { }

  ngOnInit() {
    this.untotal = this.navParams.get('eltotal');
    this.productos = this.navParams.get('productosS');
    console.log(this.productos);
    this.datosEnvio = {
      nombreC: '',
      ciudadC: '',
      calleC: '',
      cpC: '',
      telefonoC: '',
      arregloFloral: this.productos,
      total: this.untotal,
      status: false
    };
  }

  close() {
    this.modalController.dismiss();
  }

  async enviarDatos() {

    const loading = await this.loadingCrtl.create({
      message: 'Enviando pedido..'
    });
    await loading.present();

    this.service.addTodo(this.datosEnvio).then(() => {
      loading.dismiss();
      this.close();
      this.nav.navigateBack('/app/tabs/tab1');
    });
  }
}

