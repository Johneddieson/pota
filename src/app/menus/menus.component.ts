import { Component, OnChanges, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthserviceService } from '../authservice.service';
import { Product } from '../product.model';
import {CartItem} from '../cart.model'
import { map } from 'rxjs/operators';
import { AlertService } from 'ngx-alerts';
import {MessengerService} from '../messenger.service'
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit, OnChanges {

  sideBarOpen = true  
products: Product[] = []
meReference: AngularFirestoreDocument
prodRef: AngularFirestoreDocument
sub
cartItem:number = 0


    constructor(private alerts: AlertService, private msg: MessengerService, private auth: AuthserviceService, private afstore: AngularFirestore, private afauth: AngularFireAuth) {
        this.afauth.authState.subscribe(user => {
  
          if (user && user.uid) {
         

              this.meReference = this.afstore.doc(`users/${user.uid}`) 

                this.sub = this.meReference.valueChanges().subscribe(data => {

                })


              this.afstore.collection('Product').snapshotChanges()
              .pipe(map(actions => actions.map(a => {
                return {
                  id: a.payload.doc.id,
                  ...a.payload.doc.data() as any
                }
              }))).subscribe(data => {
                this.products = data
              })
                
          }
    }) 
  }
  ngOnChanges()  {
  }
  event(e) {

      if (e === 'All Categories') {
        this.afstore.collection('Product').snapshotChanges()
        .pipe(map(actions => actions.map(a => {
          return {
            id: a.payload.doc.id,
            ...a.payload.doc.data() as any
          }
        }))).subscribe(data => {
          this.products = data
        })
      } else {
        this.afstore.collection('Product', ref => ref.where('category', '==', e)).snapshotChanges()
        .pipe(map(actions => actions.map(a => {
          return {
            id: a.payload.doc.id,
            ...a.payload.doc.data() as any
          }
        }))).subscribe(data => {
          this.products = data
        })
      }

  
  }

      inc(data: any)   {
        if (data.quantity != 5) {
          data.quantity += 1;
        }


      }
      dec(data: any) {
        if(data.quantity != 1) {
          data.quantity -= 1
        }
      }
      itemsCart: any = []
      addCart(data: any) {  
        let cartDataNull = localStorage.getItem('localCart')
          if (cartDataNull == null) {
            let storeDataGet: any = []
          
              storeDataGet.push(data)
              localStorage.setItem('localCart', JSON.stringify(storeDataGet))
               
                  this.meReference.update({
                    mycart: firebase.default.firestore.FieldValue.arrayUnion(data.id)
                  })
          this.alerts.success(`${data.category} ${data.name} Successfully Added to your cart.`)

                
              
                      
            } else {
            var id = data.id
            let index:number = -1
         
            
            this.meReference.update({
              mycart: firebase.default.firestore.FieldValue.arrayUnion(data.id)
            })
            this.itemsCart = JSON.parse(localStorage.getItem('localCart')) 
          
            for (let i=0; i<this.itemsCart.length; i++) {
              if (id == this.itemsCart[i].id) {
                this.itemsCart[i].quantity = data.quantity
                index = i;
              
            this.alerts.info(`${data.category} ${data.name} Successfully Updated to your cart`)
               
              

                break;
              }
            }
              if (index == -1) {
                this.itemsCart.push(data)
                
                this.meReference.update({
                  mycart: firebase.default.firestore.FieldValue.arrayUnion(data.id)
                })
                localStorage.setItem('localCart', JSON.stringify(this.itemsCart))
                
                this.prodRef =    this.afstore.doc(`Product/${data.id}`)

             
              
          this.alerts.success(`${data.category} ${data.name} Successfully Added to your cart.`)
              } else {
                
                this.meReference.update({
                  mycart: firebase.default.firestore.FieldValue.arrayUnion(data.id)
                })
                localStorage.setItem('localCart', JSON.stringify(this.itemsCart))
         
              }
          
                  
            }
              this.cartItemFunc()
      }
      
      cartItemFunc() {
        var cartValue = JSON.parse(localStorage.getItem('localCart')) 
          this.cartItem = cartValue.length
        this.msg.cartSubject.next(this.cartItem)
      
      }

      

    ngOnInit(): void {  
localStorage.getItem('localCart')

    
  }
  
    
    sideBarToggler() {
      this.sideBarOpen = !this.sideBarOpen
    }
  
  
    logout() {
      this.auth.SignOut()
    }
}
