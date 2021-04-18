import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
me: AngularFirestoreDocument
sub
email;
fullname;
  count
  attendance
shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  constructor(private afstore: AngularFirestore, private afauth: AngularFireAuth) { 
      this.afauth.authState.subscribe(user => {
        if (user && user.uid) {
            this.me = this.afstore.doc(`users/${user.uid}`)

            this.afstore.collection('Attendance', ref => ref.where('date', '==', new Date().toDateString()))
          .snapshotChanges()
          .pipe(map(actions => actions.map(a => {
            return {
              id: a.payload.doc.id,
              ...a.payload.doc.data() as any
            }
          }))).subscribe(data => {
              this.attendance = data.length
          })

            this.afstore.collection('users').doc(`${user.uid}`).collection('requisition', ref => ref.where('read', '==', false))

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

}
