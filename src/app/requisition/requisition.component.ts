import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AlertService } from 'ngx-alerts';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-requisition',
  templateUrl: './requisition.component.html',
  styleUrls: ['./requisition.component.scss']
})
export class RequisitionComponent implements OnInit {

collection: AngularFirestoreCollection
wew = []
requisition
sideBarOpen = true
meReference: AngularFirestoreDocument 
sub
myfullname
myuid:string
  constructor(private alers: AlertService, private afstore: AngularFirestore, private afauth: AngularFireAuth) {
    this.afauth.authState.subscribe(user => {
      if (user && user.uid) {
          this.myuid = user.uid
      this.collection =    this.afstore.collection('users', ref => ref.where('email', '==', 'clayoven@gmail.com'))

        this.collection.snapshotChanges()
        .pipe(map(actions => actions.map(a => {
          return {
            id: a.payload.doc.id,
            ...a.payload.doc.data() as any
          }
        }))).subscribe(data => {
          this.wew = data

        })
          this.meReference = this.afstore.collection('staff').doc(`${user.uid}`)

          this.sub = this.meReference.get()
          .pipe(map(actions => {
            return {
              id: actions.id,
              ...actions.data() as any
            }
          })).subscribe(data => {
              this.myfullname = `${data.name} ${data.surname}`
          })


      }
    })
   }

  ngOnInit(): void {
  }


  trigger() {
    
    this.wew.forEach(i => {
      let date = new Date()

        this.afstore.collection('users').doc(`${i.id}`).collection('requisition')
        .add({
            sender: this.myfullname,
          message: this.requisition,
            uid: this.myuid,
          read: false,
          date: date.toDateString(),
          timefromnow: Date.now()

        })  

          this.alers.success('Your Request Sucessfully sent.')

          this.requisition = ''

    })
  }
  
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen
  }
}
