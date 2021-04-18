import { Component, OnChanges, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router } from '@angular/router';
import {loadStripe, Stripe} from '@stripe/stripe-js'
import { environment } from 'src/environments/environment';
import { MessengerService } from '../messenger.service';
import {Orders} from '../orders.model'
import * as firebase from 'firebase/app';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService } from 'ngx-alerts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Approval} from '../approval.model'
import {CustomerHistory} from '../customerhistory.model'

@Component({
  selector: 'app-checkoutform',
  templateUrl: './checkoutform.component.html',
  styleUrls: ['./checkoutform.component.scss']
})
export class CheckoutformComponent implements OnInit {
  getCartDetails: any = []
getstock : any = []
  
  total:number = 0;
  private stripe: Stripe;
    meReference: AngularFirestoreDocument
    customerHistoryCollection: AngularFirestoreCollection
    updateReference: AngularFirestoreDocument
        changes: AngularFirestoreCollection

    fullname
    firstname: string
    lastname: string
    address: string
    address2: string
    number: any
    read: boolean = false
    email
    history: AngularFirestoreCollection
    staff: AngularFirestoreCollection
    count: number
    historymodel = new Orders
    customerHistory = new CustomerHistory
    cartItem:number = 0
  approval = new Approval
wow: number
mycart = []
hasError: boolean;
phoneReq;
method
country: string
public uids = []
myuid: string
onduty: number
sub
isthismyfirstTime;
myfirstname
mylastname
mynumber
myaddress
myaddress2
constructor(private afauth: AngularFireAuth, 
    private fns: AngularFireFunctions,
    private afstore: AngularFirestore,
    private msg: MessengerService,
    private router: Router,
    private alert: AlertService,
    private formBuilder: FormBuilder) { 

      this.afauth.authState.subscribe(user => {
        if (user && user.uid) {
            this.myuid = user.uid
           this.staff =   this.afstore.collection('Orders')

          this.history = this.afstore.collection(`users/${user.uid}/orders`)
          this.meReference = this.afstore.doc(`users/${user.uid}`)

            this.sub = this.meReference.valueChanges().subscribe(da => {
                this.isthismyfirstTime = da.firstTime
                this.myfirstname = da.firstname
              this.mylastname = da.lastname
                this.mynumber = da.cellphonenumber
                this.myaddress = da.address
                this.myaddress2 = da.address2
              
              })

            this.afstore.collection('staff', ref => ref.where('onduty', '==', true))
            .snapshotChanges()
            .pipe(map(actions => actions.map(a => {
              return {
                id: a.payload.doc.id,
                ...a.payload.doc.data() as any
              }
            }))).subscribe(data => {
                this.onduty = data.length
            })


          this.meReference.valueChanges().subscribe(data => {
              
              this.email = data.email
              this.mycart = data.mycart
              this.changes = this.afstore.collection('Product', ref => ref.where(firebase.default.firestore.FieldPath.documentId(), 'in', this.mycart).where('stock', '==', 0))
          
              
            this.changes.valueChanges().subscribe(data => {
                
                this.wow = data.length



                for (const wak of data) {
                  this.alert.danger(`${wak.category} ${wak.name} has ${wak.stock} stock. Remove that to your cart so you can submit your order to the staff and approve it.`)
                }
            })


            })




          
       
       
          


        }
      })

  }

  numericOnly(event) {    
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }


  CartDetails() {
    if (localStorage.getItem('localCart')) {
      this.getCartDetails =JSON.parse(localStorage.getItem('localCart')) 
  
    }
  }

  cartItemFunc() {
    var cartValue = JSON.parse(localStorage.getItem('localCart')) 
      this.cartItem = cartValue.length
    this.msg.cartSubject.next(this.cartItem)
  
  }

  loadCart() {
    if (localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart'))
  
     this.total = this.getCartDetails.reduce((acc, val) => {
        return acc + (val.price * val.quantity)
      }, 0)
    }     
      }

  wew() {
      if (this.onduty <= 0) {
        this.alert.danger('No one staff has onduty yet your order cannot be processed. Try to comeback soon')
      } else if (this.total < 181) {
        this.alert.danger('The Lowest Total Price is 181')
      }
      
      else {
        
        this.approve()
      

          for (let i=0; i<this.getCartDetails.length; i++) { 
          
           this.afstore.collection('users').doc(`${this.myuid}`)                       
              .update({
                mycart: firebase.default.firestore.FieldValue.arrayRemove(this.getCartDetails[i].id)
              })
          }

              for (let i=0; i<this.getCartDetails.length; i++) { 
              this.historymodel.customeremail = this.email
        this.historymodel.customerfirstname = this.firstname
        this.historymodel.customerlastname = this.lastname
        this.historymodel.customeraddress = this.address
        this.historymodel.customeraddress2 = this.address2
        this.historymodel.customernumber = this.phoneReq
      this.historymodel.name = this.getCartDetails[i].name
      this.historymodel.category = this.getCartDetails[i].category
      this.historymodel.file = this.getCartDetails[i].file
      this.historymodel.photoname = this.getCartDetails[i].photoname
      this.historymodel.quantity = this.getCartDetails[i].quantity
      this.historymodel.price = this.getCartDetails[i].price
      this.historymodel.subtotal = this.getCartDetails[i].price * this.getCartDetails[i].quantity
      this.historymodel.approve = false
        this.historymodel.customeruid = this.myuid
      this.historymodel.productid = this.getCartDetails[i].id
      this.historymodel.wholedate = new Date().toLocaleString()
      let date = new Date()

      this.historymodel.date =  date.toDateString();
  this.history.add({
    customeremail: this.historymodel.customeremail,
    customerfirstname: this.historymodel.customerfirstname,
    customerlastname: this.historymodel.customerlastname,
    customeraddress: this.historymodel.customeraddress,
    customeraddress2: this.historymodel.customeraddress2,
    customernumber: this.historymodel.customernumber,
      name: this.historymodel.name,
      category: this.historymodel.category,
      file: this.historymodel.file,
      photoname: this.historymodel.photoname,
      quantity: this.historymodel.quantity,
      price: this.historymodel.price,
      subtotal: this.historymodel.subtotal,
      approve: this.historymodel.approve,
      customeruid: this.historymodel.customeruid,
      productid: this.historymodel.productid,
      wholedate: this.historymodel.wholedate,
      date: this.historymodel.date
    })


  

      }

      
      if (this.isthismyfirstTime === true) {
      
      
    this.meReference.update({
      firstname: this.firstname,
      lastname: this.lastname,
      address: this.address,
      address2: this.address2,
      cellphonenumber: this.phoneReq,
      firstTime: false
    })
      }

    

  
  localStorage.removeItem('localCart')
  this.getCartDetails = []
  this.total = 0
    this.cartItem = 0
  this.msg.cartSubject.next(this.cartItem)

  this.router.navigateByUrl('/home')      
   
  this.alert.success('Your orders successfully sent to staff stand by at home page and wait the approval it takes only a few minutes.')

  
      }


  }
  notfirstTime() {
    if (this.onduty <= 0) {
      this.alert.danger('No one staff has onduty yet your order cannot be processed. Try to comeback soon')
    } else if (this.total < 181) {
      
      this.alert.danger('The Lowest Total Price is 181')
    } 
    else {
      
      this.approve()
    

        for (let i=0; i<this.getCartDetails.length; i++) { 
        
         this.afstore.collection('users').doc(`${this.myuid}`)                       
            .update({
              mycart: firebase.default.firestore.FieldValue.arrayRemove(this.getCartDetails[i].id)
            })
        }

            for (let i=0; i<this.getCartDetails.length; i++) { 
            this.historymodel.customeremail = this.email
      this.historymodel.customerfirstname = this.myfirstname
      this.historymodel.customerlastname = this.mylastname
      this.historymodel.customeraddress = this.myaddress
      this.historymodel.customeraddress2 = this.myaddress2
      this.historymodel.customernumber = this.mynumber
    this.historymodel.name = this.getCartDetails[i].name
    this.historymodel.category = this.getCartDetails[i].category
    this.historymodel.file = this.getCartDetails[i].file
    this.historymodel.photoname = this.getCartDetails[i].photoname
    this.historymodel.quantity = this.getCartDetails[i].quantity
    this.historymodel.price = this.getCartDetails[i].price
    this.historymodel.subtotal = this.getCartDetails[i].price * this.getCartDetails[i].quantity
    this.historymodel.approve = false
      this.historymodel.customeruid = this.myuid
    this.historymodel.productid = this.getCartDetails[i].id
    this.historymodel.wholedate = new Date().toLocaleString()
    let date = new Date()

    this.historymodel.date =   date.toDateString();
this.history.add({
  customeremail: this.historymodel.customeremail,
  customerfirstname: this.historymodel.customerfirstname,
  customerlastname: this.historymodel.customerlastname,
  customeraddress: this.historymodel.customeraddress,
  customeraddress2: this.historymodel.customeraddress2,
  customernumber: this.historymodel.customernumber,
    name: this.historymodel.name,
    category: this.historymodel.category,
    file: this.historymodel.file,
    photoname: this.historymodel.photoname,
    quantity: this.historymodel.quantity,
    price: this.historymodel.price,
    subtotal: this.historymodel.subtotal,
    approve: this.historymodel.approve,
    customeruid: this.historymodel.customeruid,
    productid: this.historymodel.productid,
    wholedate: this.historymodel.wholedate,
    date: this.historymodel.date
  })




    }

    
  //   if (this.isthismyfirstTime === true) {
    
    
  
  


localStorage.removeItem('localCart')
this.getCartDetails = []
this.total = 0
  this.cartItem = 0
this.msg.cartSubject.next(this.cartItem)

this.router.navigateByUrl('/home')      
 
this.alert.success('Your orders successfully sent to staff stand by at home page and wait the approval it takes only a few minutes.')


    }

  }

  approve() {
    
    let date = new Date()
    this.approval.email = this.email
  this.approval.uid = this.myuid
  this.approval.approve = false
  this.approval.wholedate = new Date().toLocaleString()
  
  this.approval.date = date.toDateString() 
this.approval.read = false
this.staff.add({
email: this.approval.email,
uid: this.approval.uid,
wholedate: this.approval.wholedate,
date: this.approval.date,
approve: this.approval.approve,
read: this.approval.read
})
  }

  onError(obj) {
    this.hasError = obj;
}
onCountryChange(event) {
  this.country = event.iso2

}

 

 async ngOnInit() {
this.CartDetails()
this.loadCart()
this.cartItemFunc()



  // if (this.cartItem !== 0) {
  //   this.stripe = await loadStripe(environment.stripe.testKey);
  //   const elements = this.stripe.elements();

  //   const style = {
  //     base: {
  //       color: '#32325d',
  //       fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
  //       fontSmoothing: 'antialiased',
  //       fontSize: (window.innerWidth <= 500) ? '12px' : '16px',
  //       '::placeholder': {
  //         color: '#aab7c4'
  //       }
  //     },
  //     invalid: {
  //       color: '#fa755a',
  //       iconColor: '#fa755a'
  //     }
  //   };

  //   const card = elements.create('card', { style });


  //   card.mount('#card-element')

  //   card.on('change', (event) => {
  //     const displayError = document.getElementById('card-errors');
  //     if (event.error) {
  //       displayError.textContent = event.error.message;
  //     } else {
  //       displayError.textContent = '';

  //     }

  //   });

  //   const button = document.getElementById('button');
  //   button.addEventListener('click', (event) => {
  //     event.preventDefault();
  //     const ownerInfo = {
  //       owner: {
  //         name : this.fullname,
  //         email: this.email
  //       },
  //       amount: this.total,
  //       currency: 'qar'
  //     };

  //     this.stripe.createSource(card, ownerInfo).then((result) => {
    
  //       if (result.error) {
  //         const errorElement = document.getElementById('card-errors');
  //         errorElement.textContent = result.error.message;
  //       } else {



  //          }
  //     });
  //   });
  // }

 
}


//   private stripeSourceHandler(source): void {
//     const callable = this.fns.httpsCallable('stripeChargeCall');
//     const obs = callable(source);
//     obs.subscribe(res => {
//       console.log(res);
//       if (res.result === 'SUCCESSFUL') {
//         document.getElementsByClassName('text')[0].innerHTML = 'Flower Paid 💸, Thanks';
//       } else {
//         document.getElementsByClassName('text')[0].innerHTML = 'Something went wrong. 😞';
//       }
//     });

// }




}
