import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  correoUsuario: string; // Correo del usuario logeado
  lat: number;
  long: number;

  map: any;
  loading: any;
  constructor(
    private afAuth: AngularFireAuth,
    private authservice: AuthenticationService,
    private geolocation: Geolocation,
    public router: Router) { }

  ngOnInit() {
    this.afAuth.user.subscribe(data => {
      this.correoUsuario = data.email.toString();
    });
    this.getPosition();
  }

  logOutAuth() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

  getPosition(): any {
    const locationOptions = { timeout: 30000, enableHighAccuracy: true };
    this.geolocation.getCurrentPosition(locationOptions).then(response => {
      console.log(response);
      this.lat = response.coords.latitude;
      this.long = response.coords.longitude;
    })
      .catch(error => {
        console.log(error);
      });
  }
}
