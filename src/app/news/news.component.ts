import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import * as moment from 'moment'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
displayname: string
noUser
wew
news: any = []
newslength
newsCollection: AngularFirestoreCollection


  constructor(public router: Router, private afauth: AngularFireAuth, private afstore: AngularFirestore) {
      this.afauth.authState.subscribe(user => {
          if (user && user.uid) {
            
      
         


            this.displayname = user.displayName



            


          }

           this.afstore.collection('News', ref => ref.orderBy('time', 'desc'))
          .snapshotChanges().pipe(
            map(actions => actions.map(a => {
              return {
                id: a.payload.doc.id,
                ...a.payload.doc.data() as any
              }
            }))
          ).subscribe(data => {
            this.news = data
            this.newslength = data.length



          })


      })


   }

  ngOnInit(): void {

  }

  timefromnow(date) {
      return moment(date).fromNow()
  }

  
  w(data) {
  
    if (data === 'All Categories') {
      this.afstore.collection('News', ref => ref.orderBy('time', 'desc'))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          return {
            id: a.payload.doc.id,
            ...a.payload.doc.data() as any
          }
        }))
      ).subscribe(data => {
        this.news = data
        this.newslength = data.length



      })
    } else {
      this.afstore.collection('News', ref => ref.where('category', '==', data).orderBy('time', 'desc'))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          return {
            id: a.payload.doc.id,
            ...a.payload.doc.data() as any
          }
        }))
      ).subscribe(data => {
        this.news = data
        this.newslength = data.length
  
  
  
      })
    }

   

  }

}
