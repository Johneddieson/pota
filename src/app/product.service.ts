import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

productCollection: AngularFirestoreCollection

products: Product[] = []

  constructor(private afauth: AngularFireAuth, private afstore: AngularFirestore) {
      this.afauth.authState.subscribe(usr => {
        if (usr && usr.uid) {
          this.productCollection =  this.afstore.collection('Product')
          this.productCollection.snapshotChanges()
            .pipe(
              map(actions => actions.map(a => {

                return {
                  id: a.payload.doc.id,
                  ...a.payload.doc.data() as any
                }
              }))
            ).subscribe(data => {
              this.products = data
            })

        }
      })


   }



getProducts(): Product[] {
  return this.products
}


}
