import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import * as moment from 'moment'

@Component({
  selector: 'app-sendmessagetoadmin',
  templateUrl: './sendmessagetoadmin.component.html',
  styleUrls: ['./sendmessagetoadmin.component.scss']
})
export class SendmessagetoadminComponent implements OnInit {

  sideBarOpen = true
  adminuid: string  
  message
  meReference: AngularFirestoreDocument
  sub
  myfullname
  myuid: string
  constructor(private afauth: AngularFireAuth, private afstore: AngularFirestore, private router: Router) {

      this.afauth.authState.subscribe(user => {
        if (user && user.uid) {
            
              this.myuid = user.uid
          this.meReference = this.afstore.collection('staff').doc(`${user.uid}`)

            this.sub = this.meReference.valueChanges().subscribe(data => {
                  this.myfullname = `${data.name} ${data.surname}`
            })


          this.afstore.collection('users', ref => ref.where('email', '==', 'clayoven@gmail.com'))
          .snapshotChanges()
          .pipe(map(actions => actions.map(a => {
            return {
              id: a.payload.doc.id,
              ...a.payload.doc.data() as any
            }
          }))).subscribe(data => {
              for (const wak of data) {
                this.adminuid = wak.uid
              }
          })

        }
      })


   }

  ngOnInit(): void {
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen
  }
  send() {

    this.afstore.collection('users').doc(`${this.adminuid}`)
    .collection('replies')
    .add({
      
      date: moment().format('ll'),
      read: false,
      sender: this.myfullname,
sendermessage: this.message,
senderuid: this.myuid,
time: Date.now(),
isnotreplied: true


    })


    this.router.navigateByUrl('/staffhomepage')
  }

}
