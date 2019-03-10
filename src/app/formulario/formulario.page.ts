import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, LoadingController, NavController } from '@ionic/angular';
import { DatosUsuarioService, DatosEnvio } from '../shared/datos-usuario.service';
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  total = null;
  productos: any;
  pedidoId = null;
  datosEnvio: DatosEnvio = {
    nombreC: '',
    ciudadC: '',
    calleC: '',
    cpC: '',
    telefonoC: '',
    arregloFloral: [],
    status: false
  };

  constructor(private navParams: NavParams, private modalController: ModalController,
    private loadingCrtl: LoadingController, private nav: NavController, private service: DatosUsuarioService) { }

  ngOnInit() {
    this.total = this.navParams.get('eltotal');
    this.productos = this.navParams.get('productosS');
    console.log(this.productos);
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
      this.nav.navigateBack('');
    });
  }
}

