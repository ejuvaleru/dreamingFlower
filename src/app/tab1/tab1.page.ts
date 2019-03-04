import { Component, Injectable, OnInit } from '@angular/core';
import { ObtenerFloresService } from '../shared/obtener-flores.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
@Injectable({
  providedIn: 'root'
})

export class Tab1Page implements OnInit {
  respuesta: any;
  constructor(public service: ObtenerFloresService) {
  }

  ngOnInit() {

    this.service.obtenerRespuesta().subscribe(
      (data) => { this.respuesta = data; console.log(this.respuesta); },
      (error) => { console.log(error); }
    );


  }
}
