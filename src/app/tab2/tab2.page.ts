import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ObtenerFloresService } from '../shared/obtener-flores.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  correoUsuario: string; // Correo del usuario logeado

  // Ubicación de florerias
  lat: number;
  long: number;

  // Ubicación del usuario
  uLat: number;
  uLong: number;

  // ID de la florería más cercana
  floreriaCercanaID: any;
  floreriaCercanaNombre: any;

  mayor = 0;
  menor = 10000000000;

  florerias: any[] = [

  ];
  constructor(
    // private floresService: ObtenerFloresService,
    private afAuth: AngularFireAuth,
    private geolocation: Geolocation,
    public router: Router,
    private floresService: ObtenerFloresService) { }

  ngOnInit() {
    this.afAuth.user.subscribe(data => {
      this.correoUsuario = data.email.toString();
    });

    const t = this.floresService.obtenerFlores2();
    t.valueChanges().subscribe(data => {
      data.forEach(item => {
        this.setArreglo(item);
      });
    });
  }

  setArreglo(data) {
    this.florerias.push(data);
    this.getPosition();
    console.log(this.florerias);

  }



  // Método para cerrar sesión
  logOutAuth() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
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
    console.log(this.florerias + '  florerías');
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
        }
      }

    });
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
