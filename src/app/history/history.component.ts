import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { WrapTight } from 'docx';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  sideBarOpen = true 
  history: any[] = []

  can: boolean = false
  constructor(private router: Router, private afauth: AngularFireAuth, private afstore: AngularFirestore) { 
    this.afauth.authState.subscribe(user => {
      if (user && user.uid) {

        
    let dte = new Date();
    dte.setDate(dte.getDate())


    this.afstore.collection('History', ref => ref.orderBy('date', 'desc'))
    .snapshotChanges()
    .pipe(map(actions => actions.map(a => {
      return {
        id: a.payload.doc.id,
        ...a.payload.doc.data() as any
      }
    }))).subscribe(data => {
      this.history = data
    })

      }
    })

  }

  ngOnInit(): void {
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen
  }


  delete(id) {
      this.afstore.collection('History').doc(`${id}`)
      .delete()
  }


}
