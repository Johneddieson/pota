import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from 'src/environments/environment';

import {loadStripe, Stripe} from '@stripe/stripe-js'
import { map } from 'rxjs/operators';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-payorders',
  templateUrl: './payorders.component.html',
  styleUrls: ['./payorders.component.scss']
})
export class PayordersComponent implements OnInit {

  private stripe: Stripe;
  meReference: AngularFirestoreDocument
  collection: AngularFirestoreCollection
  total
  email
  fullname
  phone
  category
  datauid: string
  address
  address2
  myuid
  read
  constructor(private alerts: AlertService, private actRoute: ActivatedRoute, private afauth: AngularFireAuth, private afstore: AngularFirestore, private router: Router) {

      this.afauth.authState.subscribe(user => {
        if (user && user.uid) {
            this.myuid = user.uid
            this.meReference = this.afstore.doc(`users/${user.uid}`)

            this.meReference.valueChanges().subscribe(data => {
                this.fullname = `${data.firstname} ${data.lastname}`
                  this.email = data.email
             
                this.phone = data.cellphonenumber
              this.address = data.address
              this.address2 = data.address2
              })
              
        this.datauid = this.actRoute.snapshot.paramMap.get('id')

        this.collection = this.afstore.collection(`users/${user.uid}/approved`)
        this.collection.snapshotChanges()
        .pipe(map(actions => actions.map(a => {
          return {
            id: a.payload.doc.id,
            ...a.payload.doc.data() as any
          }
        })))
.subscribe(Data => {
  
  Data.forEach(item => {  
        this.total = item.subtotal
      this.category = item.category

      this.read = item.read

  })

  if (this.read) {
    router.navigateByUrl('/home')
  }

})
              

        }
      })


   }

  async ngOnInit(){
    

    this.stripe = await loadStripe('pk_test_udRlCSFJLKvwK0C5HyjfzdRb004cdtzgiP');
    const elements = this.stripe.elements();

    const style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: (window.innerWidth <= 500) ? '12px' : '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    const card = elements.create('card', { style });


    card.mount('#card-element')

    card.on('change', (event) => {
      const displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';

      }

    });

    const button = document.getElementById('button');
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const ownerInfo = {
        owner: {
          name : this.fullname,
          email: this.email,
         phone: this.phone,
       
          address: {
            line1: this.address,
            line2: this.address2
          }
        },
        amount: this.total,
        currency: 'qar',


      };

      this.stripe.createSource(card, ownerInfo).then((result) => {
    
        if (result.error) {
          const errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
              this.alerts.success('Payment Success. Stand by on your phone wait the message of the staff if its ready to deliver.')
          

            this.afstore.collection('users').doc(`${this.myuid}`)
            .collection('approved').doc(`${this.datauid}`)
            .update({
              read: true
            })

            this.router.navigateByUrl('/home')
           }
      });
    });
  
  }

}
