import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-salefortoday',
  templateUrl: './salefortoday.component.html',
  styleUrls: ['./salefortoday.component.scss']
})
export class SalefortodayComponent implements OnInit {

  
  sideBarOpen = true  
  salestoday: any = []
  saleslength
  total:number = 0;

  constructor(private afstore: AngularFirestore, private afauth: AngularFireAuth) {
    this.afauth.authState.subscribe(user => {
      if (user && user.uid) {
          let date = new Date()

          this.afstore.collection('History', ref => ref.where('date', '==', date.toDateString())).snapshotChanges()
          .pipe(map(actions => actions.map(a => {
            return {
              id: a.payload.doc.id,
              ...a.payload.doc.data() as any
            }
          }))).subscribe(data => {
            this.salestoday = data
            this.saleslength = data.length
            this.total = data.reduce((acc, val) => {
                return acc + (val.price * val.quantity)
            }, 0)



          })

      }
    })


   }

  ngOnInit(): void {
  }

  
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen
  }

}
