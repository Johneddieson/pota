import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Product } from '../product.model';
import {map} from 'rxjs/operators'
import * as moment from 'moment'
import {MatDialog} from '@angular/material/dialog'
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';

import {Inventory} from '../inventory.model'
import * as firebase from 'firebase/app';
import { DecreasedialogComponent } from '../decreasedialog/decreasedialog.component';
import { AlertService } from 'ngx-alerts';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  sideBarOpen: boolean = true
products: Product[] = []
inventory = new Inventory
inventoryCollection: AngularFirestoreCollection
productDocReference: AngularFirestoreDocument
meReference: AngularFirestoreDocument
sub
fullname
totalstocknow
decreasestock

  constructor(private alerts: AlertService, public dialog: MatDialog, private afauth: AngularFireAuth, private afstore: AngularFirestore) {
      this.afauth.authState.subscribe(user => {
        if (user && user.uid) {

            this.meReference = this.afstore.doc(`users/${user.uid}`)

            this.sub = this.meReference.valueChanges().subscribe(data => {
                    this.fullname = data.fullname
            })


              this.afstore.collection('Product', ref => ref.orderBy("date", "desc")).snapshotChanges()
              .pipe(map(actions => actions.map(a => {
                  return {
                    id: a.payload.doc.id,
                    ...a.payload.doc.data() as any
                  }

              }))).subscribe(data => {
                this.products = data
              })


                  this.inventoryCollection = this.afstore.collection('Inventory')


        }
      })

   }


   stockings(id: string) {
    
    
    
    
      }
   openDialog(id: string, category: string, name: string, stock: number) {
   let dialogref =  this.dialog.open(DialogExampleComponent)
    
   dialogref.afterClosed().subscribe(result => {
      
      if (!result) {
        this.alerts.danger('No Data Added')
      } else {
        
    this.productDocReference = this.afstore.collection('Product').doc(`${id}`)


    this.productDocReference.update({
      stock: firebase.default.firestore.FieldValue.increment(result)
    })
    


    this.productDocReference.get()
    .pipe(map(actions => {
      return {
        id: actions.id,
        ...actions.data() as any
      }
    })).subscribe(data => {
    let date = new Date()

    
      this.totalstocknow = data.stock

      this.inventory.message = `Admin Management increased the ${name} stock ${stock} to ${result} The category of ${category}. The total stock now is ${this.totalstocknow}`
      this.inventory.wholedate = new Date().toLocaleString()
      this.inventory.timefromnow = Date.now()
      this.inventory.date =  date.toDateString()
          this.inventory.read = false
        this.inventory.addition = true
          let message =this.inventory.message
    let wholedate = this.inventory.wholedate
    let time = this.inventory.timefromnow
        let read = this.inventory.read
        let addition = this.inventory.addition
     
    this.inventoryCollection.add({
      message: message,
      wholedate: wholedate,
      timefromnow: time,
      read: read,
      date: this.inventory.date,
      addition: addition
    })
    
    })
  
      }



      
    
       
    
    

   
    })
  
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

  decreaseDialog(id: string, category: string, name: string, stock: number) {
   
    let dialogref =  this.dialog.open(DecreasedialogComponent)
    
    dialogref.afterClosed().subscribe(result => {

        if (!result) {

        } else {
          
       
        if (result > stock) {
          this.alerts.danger('You cannot decreased if the value is greater than the stock')
          
        } else {
          this.productDocReference = this.afstore.collection('Product').doc(`${id}`)

          this.productDocReference.update({
            stock: firebase.default.firestore.FieldValue.increment(-result)
          })
          
     
          
         this.productDocReference.get()
         .pipe(map(actions => {
           return {
             id: actions.id,
             ...actions.data() as any
           }
         })).subscribe(data => {
   let date = new Date()      
     
              
                
        
    
    
        
          this.decreasestock = data.stock
    
          this.inventory.message = `Admin Management decreased the ${name} stock ${stock} to ${result} The category of ${category}. The total stock now is ${this.decreasestock}`
          this.inventory.wholedate = new Date().toLocaleString()
          this.inventory.timefromnow = Date.now()
          this.inventory.date =  date.toDateString()
   
              this.inventory.read = false
            this.inventory.addition = false
              let message =this.inventory.message
        let wholedate = this.inventory.wholedate
        let time = this.inventory.timefromnow
            let read = this.inventory.read
            let addition = this.inventory.addition
         
        this.inventoryCollection.add({
          message: message,
          wholedate: wholedate,
          timefromnow: time,
          read: read,
          date: this.inventory.date,
          addition: addition
        })
     
              
     
     
         
         })
       
        }


   
       
     
        }


        
     
     
 
    
     })

  }


  ngOnInit(): void {
  }

  time(time) {

    return moment(time).fromNow()
  }


  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen
  }


}
