import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { DatosUsuarioService, DatosEnvio } from '../shared/datos-usuario.service';
import { ObtenerFloresService } from '../shared/obtener-flores.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  untotal = null;
  productos: any;
  datosEnvio: DatosEnvio;
  florerias: any[] = [];

  // Ubicación de florerias
  lat: number;
  long: number;

  // Ubicación del usuario
  uLat: number;
  uLong: number;

  // ID de la florería más cercana
  floreriaCercanaID: string;
  floreriaCercanaNombre: any;

  mayor = 0;
  menor = 10000000000;
  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private loadingCrtl: LoadingController,
    private nav: NavController,
    private service: DatosUsuarioService,
    private floresService: ObtenerFloresService,
    public toastCtrl: ToastController,
    private geolocation: Geolocation,
  ) { }

  ngOnInit() {
    this.untotal = this.navParams.get('eltotal');
    this.productos = this.navParams.get('productosS');
    this.datosEnvio = {
      nombreC: '',
      ciudadC: '',
      calleC: '',
      cpC: '',
      telefonoC: '',
      arregloFloral: this.productos,
      total: this.untotal,
      status: false,
      entregado: false,
      token: this.floresService.token,
      floreriaId: ''
    };
    this.presentToast(this.floresService.token);


    const t = this.floresService.obtenerFlores2();
    t.valueChanges().subscribe(data => {
      data.forEach(item => {
        this.setArreglo(item);
      });
    });
  }

  setArreglo(data) {
    this.florerias.push(data);
    console.log(this.florerias);
    this.getPosition();
    this.datosEnvio.floreriaId = this.floreriaCercanaID;
    console.log(this.datosEnvio.floreriaId);
  }

  close() {
    this.modalController.dismiss();
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  async enviarDatos() {
    console.log(this.datosEnvio.floreriaId);
    const loading = await this.loadingCrtl.create({
      message: 'Enviando pedido...'
    });
    await loading.present();

    this.service.addTodo(this.datosEnvio).then(() => {
      loading.dismiss();
      this.close();
      this.nav.navigateBack('/app/tabs/tab1');
      this.floresService.resetCart();
    });
  }


  // Método para obtener la posición del usuario
  getPosition(): any {
    const locationOptions = { timeout: 30000, enableHighAccuracy: true };
    this.geolocation.getCurrentPosition(locationOptions).then(response => {
      this.uLat = response.coords.latitude;
      this.uLong = response.coords.longitude;
      this.obtenerFlorerias(this.uLat, this.uLong);
    })
      .catch(error => {
        console.log(error);
      });
  }

  // Obtener florerias para calcular distancias
  obtenerFlorerias(laU: number, lnU: number) {
    this.florerias.forEach(item => {
      this.lat = item.lat;
      this.long = item.long;
      for (let i = 0; i < this.florerias.length; i++) {
        if (this.calcularDistancia(this.lat, laU, this.long, lnU) > this.mayor) {
          this.mayor = this.calcularDistancia(this.lat, laU, this.long, lnU);
        }
        if (this.calcularDistancia(this.lat, laU, this.long, lnU) < this.menor) {
          this.menor = this.calcularDistancia(this.lat, laU, this.long, lnU);
          this.floreriaCercanaNombre = item.nombre;
          this.floreriaCercanaID = item.userId;
          this.datosEnvio.floreriaId = item.userId;
        }
      }

    });
    console.log(this.floreriaCercanaID);
  }

  // Calcular distancia entre 2 puntos devolviendo un valor en kilometros
  calcularDistancia(lat1: number, lat2: number, long1: number, long2: number) {
    const p = 0.017453292519943295;    // Math.PI / 180
    const c = Math.cos;
    const a = 0.5 - c((lat1 - lat2) * p) / 2 + c(lat2 * p) * c((lat1) * p) * (1 - c(((long1 - long2) * p))) / 2;
    const dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    console.log(dis);
    return dis;
  }
}

