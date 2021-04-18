import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AlertService } from 'ngx-alerts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthserviceService } from '../authservice.service';
import { Inventory } from '../inventory.model';
import { Orders } from '../orders.model';
import { History } from '../history.model';
import { Approval } from '../approval.model';
import { Router } from '@angular/router';
import * as moment from 'moment'
import { MatDialog } from '@angular/material/dialog';
import { DialogmessageComponent } from '../dialogmessage/dialogmessage.component';
@Component({
  selector: 'app-customerheader',
  templateUrl: './customerheader.component.html',
  styleUrls: ['./customerheader.component.scss']
})
export class CustomerheaderComponent implements OnInit {
orders: Approval[] = []
  OrderCollection: AngularFirestoreCollection
  HistoryCollection: AngularFirestoreCollection
  OrderReference: AngularFirestoreDocument
  ProductReference: AngularFirestoreDocument
  CountCollection: AngularFirestoreCollection
schedCollection: AngularFirestoreCollection
sub
inventoryCollection: AngularFirestoreCollection
count: number
Mereference: AngularFirestoreDocument

schedlength: number
inventory = new Inventory
history = new History
stock: any
customeremail
quantity
email
category
name
totalstock
app: boolean = false
prod: Observable<any>
requiNotifs: any = []
ord: Orders[] = []
myuid: string
requilength
messages: any = []
messageslength
myfullname
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter()
  constructor(private dialog: MatDialog, private router: Router, private alertS: AlertService, private afstore: AngularFirestore, private afauth: AngularFireAuth, private fire: AuthserviceService) {

      this.afauth.authState.subscribe(user => {

        if (user && user.uid) {
              this.myuid = user.uid
          
            this.Mereference = this.afstore.collection('staff').doc(`${user.uid}`)

            this.sub = this.Mereference.valueChanges().subscribe(data => {
                  this.myfullname = `${data.name} ${data.surname}`
            })


          this.inventoryCollection = this.afstore.collection('Inventory')

this.HistoryCollection = this.afstore.collection('History')
         this.OrderCollection =   this.afstore.collection(`Orders`, ref => ref.orderBy('wholedate', 'desc'))
           


           this.OrderCollection.snapshotChanges().pipe(
             map(actions => actions.map(a => {
               return {
                 id: a.payload.doc.id,
                 ...a.payload.doc.data() as any
               }
             }))
           ).subscribe(data => {
             this.orders = data


           })

           this.CountCollection = this.afstore.collection(`Orders`, ref => ref.where('read', '==', false))
           this.CountCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
             return {
               id: a.payload.doc.id,
               ...a.payload.doc.data() as any
             }
           }))).subscribe(data => {
              this.count = data.length
           })

           this.schedCollection = this.afstore.collection(`staff/${user.uid}/myschedule`, ref => ref.where('timein', '==', true))

           this.schedCollection.snapshotChanges()
           .pipe(map(actions => actions.map(a => {
              return {
                id: a.payload.doc.id,
                ...a.payload.doc.data() as any
              }

           })))
           .subscribe(data => {
              this.schedlength = data.length
              
           })
          

            this.afstore.collection(`staff/${user.uid}/requisitionNotifs`, ref => ref.orderBy('timefromnow', 'desc'))
            .snapshotChanges()
            .pipe(map(actions => actions.map(a => {
              return {
                id: a.payload.doc.id,
                ...a.payload.doc.data() as any
              }
            }))).subscribe(data => {
              this.requiNotifs = data
            })

            this.afstore.collection(`staff/${user.uid}/requisitionNotifs`, ref => ref.where('read', '==', false))
            .snapshotChanges()
            .pipe(map(actions => actions.map(a => {
              return {
                id: a.payload.doc.id,
                ...a.payload.doc.data() as any
              }
            }))).subscribe(data => {
                this.requilength = data.length
            })



              this.afstore.collection('staff').doc(`${user.uid}`).collection('messages', ref => ref.orderBy('time', 'desc'))
              .snapshotChanges()
              .pipe(map(actions => actions.map(a => {
                return {
                  id: a.payload.doc.id,
                  ...a.payload.doc.data() as any
                }
              }))).subscribe(data => {
                  this.messages = data
              })
              this.afstore.collection('staff').doc(`${user.uid}`).collection('messages', ref => ref.where('read', '==', false))
              .snapshotChanges()
              .pipe(map(actions => actions.map(a => {
                return {
                  id: a.payload.doc.id,
                  ...a.payload.doc.data() as any
                }
              }))).subscribe(data => {

                  this.messageslength = data.length
              })


          }
      })

   }

  ngOnInit(): void {
  }

  markasread(id) {
    this.afstore.collection('staff').doc(`${this.myuid}`).collection('requisitionNotifs')
    .doc(`${id}`)
    .update({
      read: true
    })
  }
  now(date) {
    return moment(date).toNow()
  }
  timenow(date) {
    return moment(date).fromNow()
  }

  approve(id, uid) {

    this.router.navigateByUrl(`order/${id}/${uid}`)








          
          

          




              


  
  
      }

  logout() {
    this.fire.SignOut()
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit()
  
    setTimeout(() => {
        window.dispatchEvent(
          new Event('resize')
        )
    }, 300);
  }

  reply(id, message, uid) {
    let dialogRef = this.dialog.open(DialogmessageComponent)

    dialogRef.afterClosed().subscribe(result => {
      
    this.afstore.collection('users').doc(`${uid}`).collection('replies')

    .add({
        sender: this.myfullname,
        mymessage: message,
        sendermessage: result,
        senderuid: this.myuid,
        date: moment().format('ll'),
        time: Date.now(),
        read: false
    })

    this.afstore.collection('staff').doc(`${this.myuid}`).collection('messages')
    .doc(`${id}`)
    .update({
      read: true
    })
    
    
    })

  }

}
