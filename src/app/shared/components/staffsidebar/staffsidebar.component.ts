import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-staffsidebar',
  templateUrl: './staffsidebar.component.html',
  styleUrls: ['./staffsidebar.component.scss']
})
export class StaffsidebarComponent implements OnInit {
staffReference: AngularFirestoreDocument
name
surname 
email;
count
totalsales
date = new Date()
inventoryCollection: AngularFirestoreCollection
  constructor(private afauth: AngularFireAuth, private afstore: AngularFirestore) {

    this.afauth.authState.subscribe(user => {
      if (user && user.uid) {


        this.afstore.collection('History', ref => ref.where('date', '==', this.date.toDateString())).snapshotChanges()
        .pipe(map(actions => actions.map(a => {
          return {
            id: a.payload.doc.id,
            ...a.payload.doc.data() as any
          }
        }))).subscribe(data => {
            this.totalsales = data.length

        })
      
        this.staffReference = this.afstore.doc(`staff/${user.uid}`)

        this.staffReference.valueChanges().subscribe(data => {
          this.name = data.name
          this.surname = data.surname

        })
          let date = new Date()
          date.setDate(date.getDate())
      
          this.inventoryCollection = this.afstore.collection('Inventory', ref => ref.where('date', '==', date.toDateString()))
          this.inventoryCollection.snapshotChanges()
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
