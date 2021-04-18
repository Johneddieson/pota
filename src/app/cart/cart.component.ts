import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MessengerService } from '../messenger.service';
import * as firebase from 'firebase/app'
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
getCartDetails: any = []
total:number = 0;
  Checkout: AngularFirestoreCollection
  meReference: AngularFirestoreDocument
  sub
    prodRef: AngularFirestoreDocument


cartItem:number = 0
  constructor(private router: Router, private afauth: AngularFireAuth, private afstore: AngularFirestore, private msg: MessengerService) {
    this.afauth.authState.subscribe(user => {
      if (user && user.uid) {

        this.meReference = this.afstore.doc(`users/${user.uid}`)
            this.sub = this.meReference.valueChanges().subscribe(data => {

            })

        this.Checkout = this.afstore.collection('History')
      }
    })
   }

  ngOnInit(): void {
    this.CartDetails()
  this.loadCart()
  
  }


  CartDetails() {
    if (localStorage.getItem('localCart')) {
      this.getCartDetails =JSON.parse(localStorage.getItem('localCart')) 
  
    }
  }

  inc(id, quantity) {
      for(let i=0; i<this.getCartDetails.length; i++ ) {
        if (this.getCartDetails[i].id === id) {

          
           this.getCartDetails[i].quantity = quantity + 1
        }
      }
  
      localStorage.setItem('localCart', JSON.stringify(this.getCartDetails))
    
        this.loadCart()
    }

    dec(id, quantity) {
        
      for(let i=0; i<this.getCartDetails.length; i++ ) {
        if (this.getCartDetails[i].id === id) {

          if(quantity != 1)
           this.getCartDetails[i].quantity = quantity - 1
        
        
        
        
           this.prodRef =    this.afstore.doc(`Product/${id}`)

           this.prodRef.update({
             stock: firebase.default.firestore.FieldValue.increment(+this.getCartDetails[i].quantity)
           })
        
          }
      }
  
      localStorage.setItem('localCart', JSON.stringify(this.getCartDetails))
        this.loadCart()
    }

    loadCart() {
  if (localStorage.getItem('localCart')) {
    this.getCartDetails = JSON.parse(localStorage.getItem('localCart'))

   this.total = this.getCartDetails.reduce((acc, val) => {
      return acc + (val.price * val.quantity)
    }, 0)
  }     
    }


    removeall() {
     
      this.deletemycart()
      localStorage.removeItem('localCart')
      
        
      this.getCartDetails = []
      this.total = 0
        this.cartItem = 0
      this.msg.cartSubject.next(this.cartItem)
          this.meReference.update({
            mycart: firebase.default.firestore.FieldValue.arrayUnion('haha')
          })
      
    }

    deletemycart() {
      for (let i=0; i<this.getCartDetails.length; i++) {
        
        this.meReference.update({
          mycart: firebase.default.firestore.FieldValue.arrayRemove(this.getCartDetails[i].id)
        })
        }
    }

    singleDelete(data) {
        if (localStorage.getItem('localCart')) {
          this.getCartDetails = JSON.parse(localStorage.getItem('localCart')) 
        
          for (let i=0; i<this.getCartDetails.length; i++) {
            if (this.getCartDetails[i].id === data.id) {
              this.getCartDetails.splice(i, 1);
              localStorage.setItem('localCart', JSON.stringify(this.getCartDetails))
              this.meReference.update({
                mycart: firebase.default.firestore.FieldValue.arrayRemove(data.id)
              })
              this.loadCart()
              this.cartItemFunc()
            }
          }
        }
    }
    cartItemFunc() {
      var cartValue = JSON.parse(localStorage.getItem('localCart')) 
        this.cartItem = cartValue.length
      this.msg.cartSubject.next(this.cartItem)
    
    }
    checkout() {
      this.router.navigateByUrl('/checkout')
    }




//     checkout() {

//       for (let i=0; i<this.getCartDetails.length; i++) {

//         this.updateReference = this.afstore.doc(`Product/${this.getCartDetails[i].id}`)


// var total = (this.getCartDetails[i].stock,  this.getCartDetails[i].quantity)
         


// this.updateReference.update({
//         stock: firebase.default.firestore.FieldValue.increment(-total)
//       })

//       }

     
    
//     }
}
