import { Component, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  map: any;
  loading: any;
  constructor(private geolocation: Geolocation) { }

  ngOnInit() {
    this.getPosition();
  }

  getPosition(): any {
    const locationOptions = { timeout: 30000, enableHighAccuracy: true };
    this.geolocation.getCurrentPosition(locationOptions).then(response => {
      this.loadMap(response);
      console.log(response);
    })
      .catch(error => {
        console.log(error);
      });
  }

  loadMap(position: Geoposition) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, longitude);

    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');

    // create LatLng object
    const myLatLng = { lat: latitude, lng: longitude };

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      const marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Hello World!'
      });
      mapEle.classList.add('show-map');
    });
  }
}
