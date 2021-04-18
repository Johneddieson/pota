import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthserviceService } from 'src/app/authservice.service';
import * as moment from 'moment'
import { MatDialog } from '@angular/material/dialog';
import { DialogmessageComponent } from 'src/app/dialogmessage/dialogmessage.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
repliesCollection: AngularFirestoreCollection
rep: any = []
count
myuid: string
totalinventoryFortoday;
totalofhistory
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter()
  constructor(private matDialog: MatDialog, private afstore: AngularFirestore, private auth: AuthserviceService, private afauth: AngularFireAuth) {
      this.afauth.authState.subscribe(user => {
        if (user && user.uid) {
          this.myuid = user.uid

          this.afstore.collection('History').valueChanges()
          .subscribe(data => {
              this.totalofhistory = data.length
          })


          this.afstore.collection('Inventory', ref => ref.where('date', '==', new Date().toDateString()))
            .valueChanges().subscribe(data => {
              this.totalinventoryFortoday = data.length
            })
    this.repliesCollection  =     this.afstore.collection('users').doc(`${user.uid}`).collection('replies', ref => ref.orderBy('time', 'desc'))

    this.repliesCollection.snapshotChanges()
    .pipe(map(actions => actions.map(a => {
      return {
        id: a.payload.doc.id,
        ...a.payload.doc.data() as any
      }
    }))).subscribe(data => {
        this.rep = data
    })

    this.afstore.collection('users').doc(`${user.uid}`).collection('replies', ref => ref.where('read', '==', false))
        .snapshotChanges()
        .pipe(map(actions => actions.map(a => {
          return {
            id: a.payload.doc.id,
            ...a.payload.doc.data() as any
          }
        }))).subscribe(data => {
          this.count = data.length

        })      
        }
      })

   }

  ngOnInit(): void {
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit()
  
    setTimeout(() => {
        window.dispatchEvent(
          new Event('resize')
        )
    }, 300);
  }

  logout() {
    this.auth.SignOut()
  }
  timenow(date) {
    return moment(date).fromNow()
  }
  reply(id, sendermessage, senderuid) {
    let dialogRef = this.matDialog.open(DialogmessageComponent)

    dialogRef.afterClosed().subscribe(result => {
      this.afstore.collection('staff').doc(`${senderuid}`)
      .collection('messages')
      .add({
        name: 'Admin Management',
        message: result,
        yourmessage: sendermessage,
        date: moment().format('ll'),
        time: Date.now(),
        reply: true,
        uid:  this.myuid,
        read: false
      })

      this.afstore.collection('users').doc(`${this.myuid}`).collection('replies')
      .doc(`${id}`)
      .update({
        read: true
      })
    })
  }

}
