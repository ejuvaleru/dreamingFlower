import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ObtenerFloresService {

  constructor(private http: HttpClient) { }

  obtenerRespuesta() {
    return this.http.get('https://dreamflowers-65edb.firebaseio.com/.json');
  }
}
