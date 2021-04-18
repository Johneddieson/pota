import { Component, HostBinding, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
sideBarOpen = true  
me: AngularFirestoreDocument
email;
collection: AngularFirestoreCollection
fullname
sub
reqs: any = []
results: any = []
myuid
news: any = []
newslength;
  constructor(private auth: AuthserviceService, private afauth: AngularFireAuth, private afstore: AngularFirestore) {

      this.afauth.authState.subscribe(user => {
        if (user && user.uid) {

            this.afstore.collection('News', ref => ref.orderBy('time', 'desc'))
            .snapshotChanges()
            .pipe(map(actions => actions.map(A => {
              return {
                id: A.payload.doc.id,
                ...A.payload.doc.data() as any
              }
            }))).subscribe(data => {
                this.news = data
                this.newslength = data.length
              })


     
            this.myuid = user.uid
          this.collection = this.afstore.collection(`users/${user.uid}/requisition`, ref => ref.where('read', '==', false).orderBy('timefromnow', 'desc'))


            this.collection.snapshotChanges()
            .pipe(map(actions => actions.map(a => {
              return {
                id: a.payload.doc.id,
                ...a.payload.doc.data() as any
              }
            })))
            .subscribe(data => {
                this.reqs = data
            })

            this.afstore.collection(`users/${this.myuid}/approve&decline`, ref => ref.orderBy('timefromnow', 'desc'))
            .snapshotChanges()
            .pipe(map(actions => actions.map(a => {
              return {
                id: a.payload.doc.id,
                ...a.payload.doc.data() as any
              }
            }))).subscribe(data => {
                this.results = data

            })

          
        }

      })


   }

  ngOnInit(): void {
  }
  accept(id:string, uid: string, message: string, sender: string) {
     
    this.afstore.collection('staff').doc(`${uid}`).collection('requisitionNotifs').add({
      message: 'The Admin Management Has been approved your requisition for purchase',
      date: new Date().toDateString(),
      yourRequest: message,
      timefromnow: Date.now(),
      read: false

    })

    this.afstore.collection('users').doc(`${this.myuid}`).collection('requisition').doc(`${id}`)
    .update({
      read: true
    })

    this.afstore.collection('users').doc(`${this.myuid}`).collection('approve&decline').add({
        approve: true,
        sender: sender,
        
        message: message,
        date: new Date().toDateString(),
        timefromnow: Date.now()

    })


  }

  decline(id:string, uid: string, message: string, sender: string) {
     
    this.afstore.collection('staff').doc(`${uid}`).collection('requisitionNotifs').add({
      message: 'The Admin Management Has been declined your requisition for purchase',
      yourRequest: message,
      date: new Date().toDateString(),

      timefromnow: Date.now(),
      read: false

    })

    this.afstore.collection('users').doc(`${this.myuid}`).collection('requisition').doc(`${id}`)
    .update({
      read: true
    })

    this.afstore.collection('users').doc(`${this.myuid}`).collection('approve&decline').add({
        approve: false,
        sender: sender,
        message: message,
        date: new Date().toDateString(),
        timefromnow: Date.now()

    })


  }


  logout() {
    this.auth.SignOut()
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen
  }

  w(data) {

      if (data === 'All Categories') {
        this.afstore.collection('News', ref => ref.orderBy('time', 'desc'))
        .snapshotChanges()
        .pipe(map(actions => actions.map(A => {
          return {
            id: A.payload.doc.id,
            ...A.payload.doc.data() as any
          }
        }))).subscribe(data => {
            this.news = data
            this.newslength = data.length
          })


      } else {
        this.afstore.collection('News', ref => ref.where('category', '==', data).orderBy('time', 'desc'))
        .snapshotChanges()
        .pipe(map(actions => actions.map(A => {
          return {
            id: A.payload.doc.id,
            ...A.payload.doc.data() as any
          }
        }))).subscribe(data => {
            this.news = data
            this.newslength = data.length
          })
      }
    
  

  }

}
