import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  sideBarOpen = true 

  attendance: any[] = []
  constructor(private afauth: AngularFireAuth, private afstore: AngularFirestore) {
      this.afauth.authState.subscribe(user => {
        if (user && user.uid) {
          this.afstore.collection('Attendance', ref => ref.orderBy('timefromnow', 'desc'))
          .snapshotChanges()
          .pipe(map(actions => actions.map(a => {
            return {
              id: a.payload.doc.id,
              ...a.payload.doc.data() as any
            }
          }))).subscribe(data => {
              this.attendance = data
          })
        }
      })

   }

  ngOnInit(): void {

    console.log(new Date().toLocaleString())
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen
  }

}
