import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AlertService } from 'ngx-alerts';
import { map } from 'rxjs/operators';
import { Orders } from '../orders.model';

import { CustomerHistory } from '../customerhistory.model';

import { Approved } from '../approved.model';
import { Inventory } from '../inventory.model';
import { History } from '../history.model';

@Component({
  selector: 'app-approveorder',
  templateUrl: './approveorder.component.html',
  styleUrls: ['./approveorder.component.scss']
})
export class ApproveorderComponent implements OnInit {
uid: string
id: string
order: Orders[] = []
productapproved: Approved[] = []
newproductapproval = new Approved
dambel;
inventoryModel = new Inventory
historymodel = new History
customerhistory = new CustomerHistory
approved: CustomerHistory[] = []
approvedCollection: AngularFirestoreCollection
historyCollection: AngularFirestoreCollection
inventoryCollection: AngularFirestoreCollection
sendtoCustomerCollection:AngularFirestoreCollection
customerhistorycollection: AngularFirestoreCollection
customeremail;
count
category;
date
name
staffuid
totalapprove
trueapprove
userReference: AngularFirestoreDocument
sub
approvedId;
subtotal
getCartDetails: any = []
customerEmail
tots:number = 0
  constructor(private actRoute: ActivatedRoute, private afauth: AngularFireAuth, private afstore: AngularFirestore, private router: Router, private alers: AlertService) {
      this.afauth.authState.subscribe(user => {
        if (user && user.uid) {
          
          this.staffuid = user.uid
            this.inventoryCollection = this.afstore.collection('Inventory')
            this.historyCollection = this.afstore.collection('History')

          this.approvedCollection =     this.afstore.collection(`staff/${user.uid}/approved`)
     this.approvedCollection.snapshotChanges()
          .pipe(map(actions => actions.map(a => {
            return {
              id: a.payload.doc.id,
              ...a.payload.doc.data() as any
            }
          }))).subscribe(wew => {
            this.productapproved = wew

            for (const wak of this.productapproved) {
                  this.approvedId = wak.id
            
                this.category = wak.category
                this.subtotal = wak.subtotal
                this.date = wak.date
                this.name = wak.name
                
              }

              this.count = wew.length
          })


          let date = new Date()

          let now =  date.toDateString()
          this.uid = this.actRoute.snapshot.paramMap.get('uid')
          this.id = this.actRoute.snapshot.paramMap.get('id')
        
          this.userReference = this.afstore.collection(`users`).doc(`${this.uid}`)

          this.sub = this.userReference.valueChanges().subscribe(data => {
                this.customerEmail = data.email
          })
         
        this.customerhistorycollection = this.afstore.collection('users').doc(`${this.uid}`)
        .collection('myhistorycollection')

        this.customerhistorycollection.snapshotChanges()
        .pipe(map(actions => actions.map(a => {
          return {
            id : a.payload.doc.id,
            ...a.payload.doc.data() as any
          }
        }))).subscribe(approved => {
         this.approved = approved
        })

          this.afstore.collection(`users/${this.uid}/orders`, ref => ref.where('date', '==', now))
          .snapshotChanges()
          .pipe(map(actions => actions.map(a => {
            return {
              id: a.payload.doc.id,
              ...a.payload.doc.data() as any
            }
          }))).subscribe(data => {
              this.order = data
              this.totalapprove = data.length
            
  
          
            })

            this.afstore.collection(`users/${this.uid}/orders`, ref => ref.where('date', '==', now).where('approve', '==', true))
            .snapshotChanges()
            .pipe(map(actions => actions.map(a => {
              return {
                id: a.payload.doc.id,
                ...a.payload.doc.data() as any
              }
            }))).subscribe(data => {
                this.trueapprove = data.length
                
               
    
            
              })

          
        }
      })


   }

   

  ngOnInit(): void {
    
  }


  approve(
    id,
    category,
     customeraddress, 
     customeraddress2, 
     customeremail, 
     customerfirstname, 
     customerlastname, 
     customernumber, 
     customeruid, 
     date, 
     file, 
     name, 
     photoname, 
     price, 
     productid, 
     quantity,
      subtotal, 
      wholedate

  ) {
this.customeremail =    customeremail
this.afstore.collection('Product')
.doc(productid)

.get()
.pipe(map(actions => {
  return {
            id: actions.id,
            ...actions.data() as any
          }
})).subscribe(data => {
  if (data.stock >= quantity) {
      if (this.count <= 0) {

          this.newproductapproval.category = category
          this.newproductapproval.name = name
          this.newproductapproval.date = date
          this.newproductapproval.quantity = quantity
          this.newproductapproval.subtotal = subtotal
          this.newproductapproval.price = price
       
        this.approvedCollection.add({
            category: `${this.newproductapproval.quantity} pieces of  ${this.newproductapproval.category} ${this.newproductapproval.name}, the price of ${this.newproductapproval.price} QAR`,
            
            date : this.newproductapproval.date,
              subtotal: this.newproductapproval.subtotal
            
       })
       this.afstore.collection('Product').doc(productid)
       .update({
         stock: data.stock - quantity
       }) 

       this.afstore.collection(`users`).doc(`${this.uid}`).collection('orders')
       .doc(`${id}`).update({
         approve: true
       })
      this.customerhistory.customeruid = customeruid
      this.customerhistory.customeremail = customeremail
      this.customerhistory.customerfirstname = customerfirstname
      this.customerhistory.customerlastname = customerlastname
      this.customerhistory.customeraddress = customeraddress
      this.customerhistory.customeraddress2 = customeraddress2
      this.customerhistory.customernumber = customernumber
      this.customerhistory.productid = productid
      this.customerhistory.name = name
      this.customerhistory.category = category
      this.customerhistory.file = file
      this.customerhistory.photoname = photoname
       this.customerhistory.quantity = quantity
      this.customerhistory.price = price
      this.customerhistory.subtotal = subtotal
      this.customerhistory.approve = true
      this.customerhistory.wholedate = wholedate
      this.customerhistory.date = date


        this.customerhistorycollection.add({
          customeruid: this.customerhistory.customeruid,
          customeremail: this.customerhistory.customeremail,
          customerfirstname:  this.customerhistory.customerfirstname,
          customerlastname: this.customerhistory.customerlastname,
          customeraddress: this.customerhistory.customeraddress,
          customeraddress2: this.customerhistory.customeraddress2,
          customernumber:  this.customerhistory.customernumber,
          productid:  this.customerhistory.productid,
          name: this.customerhistory.name,
          category: this.customerhistory.category,
          file: this.customerhistory.file,
          photoname: this.customerhistory.photoname,
          quantity: this.customerhistory.quantity,
          price:  this.customerhistory.price,
          subtotal: this.customerhistory.subtotal,
          approve:  this.customerhistory.approve,
          wholedate: this.customerhistory.wholedate,
          date:  this.customerhistory.date
        })



      } else {
        this.afstore.collection('staff').doc(`${this.staffuid}`)
        .collection('approved')
        .doc(`${this.approvedId}`)
        .update({
            category: `${this.category}, ${quantity} pieces of ${category} ${name}, the price of ${price} QAR`,
            subtotal: this.subtotal + subtotal
        })
        this.afstore.collection('Product').doc(productid)
       .update({
         stock: data.stock - quantity
       })
       
       this.afstore.collection(`users`).doc(`${this.uid}`).collection('orders')
       .doc(`${id}`).update({
         approve: true
       })

     

       this.customerhistory.customeruid = customeruid
       this.customerhistory.customeremail = customeremail
       this.customerhistory.customerfirstname = customerfirstname
       this.customerhistory.customerlastname = customerlastname
       this.customerhistory.customeraddress = customeraddress
       this.customerhistory.customeraddress2 = customeraddress2
       this.customerhistory.customernumber = customernumber
       this.customerhistory.productid = productid
       this.customerhistory.name = name
       this.customerhistory.category = category
       this.customerhistory.file = file
       this.customerhistory.photoname = photoname
        this.customerhistory.quantity = quantity
       this.customerhistory.price = price
       this.customerhistory.subtotal = subtotal
       this.customerhistory.approve = true
       this.customerhistory.wholedate = wholedate
       this.customerhistory.date = date
 
 
         this.customerhistorycollection.add({
           customeruid: this.customerhistory.customeruid,
           customeremail: this.customerhistory.customeremail,
           customerfirstname:  this.customerhistory.customerfirstname,
           customerlastname: this.customerhistory.customerlastname,
           customeraddress: this.customerhistory.customeraddress,
           customeraddress2: this.customerhistory.customeraddress2,
           customernumber:  this.customerhistory.customernumber,
           productid:  this.customerhistory.productid,
           name: this.customerhistory.name,
           category: this.customerhistory.category,
           file: this.customerhistory.file,
           photoname: this.customerhistory.photoname,
           quantity: this.customerhistory.quantity,
           price:  this.customerhistory.price,
           subtotal: this.customerhistory.subtotal,
           approve:  this.customerhistory.approve,
           wholedate: this.customerhistory.wholedate,
           date:  this.customerhistory.date
         })

       
      }



  } else {
    this.alers.danger(`${data.category} ${data.name} has ${data.stock} stock. You cannot approve this order unless add a stock to this product.`)
  }
})

  }


  readytoDeliver() {
   this.order.forEach(item => {
        this.afstore.collection('Product')
        .doc(`${item.productid}`)
        .get()
        .pipe(map(actions => {
          return {
            id: actions.id,
            ...actions.data() as any
          }
        })).subscribe(data => {
               


    this.inventoryModel.message
    = `${item.customeremail} the wholename is 
    ${item.customerfirstname}
     ${item.customerlastname} has bought
      ${item.quantity} pieces of ${item.category} - ${item.name} The stock is subtracted and the total stock now is ${data.stock}.
 
          
      `
      this.inventoryModel.addition = false
      this.inventoryModel.wholedate = item.wholedate
      this.inventoryModel.date = item.date
          this.inventoryModel.timefromnow = Date.now()
          this.inventoryModel.read = false
     
     
     
              this.inventoryCollection.add({
                message: this.inventoryModel.message,
                addition: this.inventoryModel.addition,
                wholedate: this.inventoryModel.wholedate,
                date: this.inventoryModel.date,
                read: this.inventoryModel.read,
                timefromnow: this.inventoryModel.timefromnow
              })


     
        })
    
   })

   this.order.forEach(i => {
           this.historymodel.customeremail = i.customeremail
              this.historymodel.customerfirstname = i.customerfirstname
              this.historymodel.customerlastname = i.customerlastname
              this.historymodel.customeraddress = i.customeraddress
              this.historymodel.customeraddress2 = i.customeraddress2
              this.historymodel.customernumber = i.customernumber
            this.historymodel.name = i.name
            this.historymodel.category = i.category
            this.historymodel.file = i.file
            this.historymodel.photoname = i.photoname
            this.historymodel.quantity = i.quantity
            this.historymodel.price = i.price
            this.historymodel.subtotal = i.subtotal
            this.historymodel.approve = i.approve
              this.historymodel.customeruid = i.customeruid
            this.historymodel.productid = i.productid
            this.historymodel.wholedate = i.wholedate
            

            this.historymodel.date =  i.date;
            

            this.historyCollection.add({

              customeremail: this.historymodel.customeremail, 
              customerfirstname: this.historymodel.customerfirstname,
              customerlastname: this.historymodel.customerlastname, 
              customeraddress:  this.historymodel.customeraddress,
              customeraddress2: this.historymodel.customeraddress2,
              customernumber:  this.historymodel.customernumber,
              name:   this.historymodel.name,
              category: this.historymodel.category,
              file: this.historymodel.file,
              photoname:  this.historymodel.photoname,
              quantity: this.historymodel.quantity,
              price:  this.historymodel.price,
              subtotal: this.historymodel.subtotal,
              approve:   this.historymodel.approve,
              customeruid:  this.historymodel.customeruid,
              productid: this.historymodel.productid, 
              wholedate:  this.historymodel.wholedate, 
            

              date:   this.historymodel.date ,
            
            })
   })

   

  
   this.sendtoCustomerCollection = this.afstore.collection(`users`).doc(`${this.uid}`).collection('approved')

   this.newproductapproval.category = this.category
   this.newproductapproval.date = this.date
   this.newproductapproval.subtotal = this.subtotal
   this.newproductapproval.read = false

    this.sendtoCustomerCollection.add({
      category: this.newproductapproval.category,
      subtotal: this.newproductapproval.subtotal,
      date: this.newproductapproval.date,
      read: this.newproductapproval.read
    })


        this.order.forEach(i => {
              this.afstore.collection('users').doc(`${this.uid}`)
              .collection('orders').doc(`${i.id}`)
              .delete()
        })


    this.afstore.collection('Orders').doc(`${this.id}`)
    .update({
      read: true
    })



   this.afstore.collection('staff').doc(`${this.staffuid}`)
   .collection('approved')
   .doc(`${this.approvedId}`).delete()



   this.alers.success(`Orders Approved.`)
   
   
  }

}
