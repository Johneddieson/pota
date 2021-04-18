import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as moment from 'moment'
import { AlertService } from 'ngx-alerts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sendmessagetostaff',
  templateUrl: './sendmessagetostaff.component.html',
  styleUrls: ['./sendmessagetostaff.component.scss']
})
export class SendmessagetostaffComponent implements OnInit {
  sideBarOpen: boolean = true
  staffcollection: AngularFirestoreCollection
  staff: any[] = []
  value
  message
  public uids = []
  myuid: string
  constructor(private alers: AlertService, private router: Router, private afauth: AngularFireAuth, private afstore: AngularFirestore) {
      this.afauth.authState.subscribe(user => {
        if (user && user.uid) {
              this.myuid = user.uid
          
          this.staffcollection = this.afstore.collection('staff')

          this.staffcollection.snapshotChanges()
          .pipe(map(actions => actions.map(a => {
            return {
              id: a.payload.doc.id,
              ...a.payload.doc.data() as any
            }
          }))).subscribe(data => {
            this.staff = data

            this.uids = data
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
    if (this.value === 'Send To All') {

      this.uids.forEach(i => {
        this.afstore.collection('staff').doc(`${i.id}`).collection('messages').add({
          name: 'Admin Management',
            message: this.message,
            read: false,
            date: moment().format('ll'),
            time: Date.now(),
            uid: this.myuid
        })
      })

      this.alers.success('Successfully sent to all staffs.')
      this.router.navigateByUrl('/admin')

    } else {
      this.afstore.collection('staff').doc(`${this.value}`).collection('messages')
      .add({
        name: 'Admin Management',
        message: this.message,
        read: false,
        date: moment().format('ll'),
        time: Date.now(),
        uid: this.myuid
      })
        this.afstore.collection('staff').doc(`${this.value}`)
        .get()
        .pipe(map(act => {
          return {
            id: act.id,
            ...act.data() as any
          }
        })).subscribe(data => {
          
      this.alers.success(`Successfully sent to ${data.name} ${data.surname}.`)
      this.router.navigateByUrl('/admin')
        })
      
    
    }
  }

}
