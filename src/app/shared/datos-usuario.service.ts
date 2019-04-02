import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface DatosEnvio {
  nombreC: string;
  calleC: string;
  cpC: string;
  ciudadC: string;
  telefonoC: string;
  arregloFloral: any;
  status: boolean;
  total: number;
  entregado: boolean;
  token: string;
  floreriaId: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatosUsuarioService {

  private datosCollection: AngularFirestoreCollection<DatosEnvio>;
  private datosEnvio: Observable<DatosEnvio[]>;
  constructor(private db: AngularFirestore) {
    this.datosCollection = db.collection<DatosEnvio>('solicitudes');

    this.datosEnvio = this.datosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  createPedido(pedido) {
    return new Promise<any>((resolve, reject) => {
      this.db.collection('solicitudes').doc(pedido.id)
        .collection('pedidos').add({
          nombreC: pedido.nombreC,
          calleC: pedido.calleC,
          cpC: pedido.cpC,
          ciudadC: pedido.ciudadC,
          telefonoC: pedido.telefonoC,
          arregloFloral: pedido.arregloFloral,
          status: pedido.status,
          total: pedido.total,
          entregado: pedido.entregado
        })
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }

  addTodo(pedido: DatosEnvio) {
    return this.datosCollection.add(pedido);
  }
}
