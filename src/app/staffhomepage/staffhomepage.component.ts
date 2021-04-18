import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthserviceService } from '../authservice.service';
import { MessengerService } from '../messenger.service';
import { Schedule } from '../schedule.model';
import * as moment from 'moment'
import { StaffAttendance} from '../attendance.model'
import { AlertService } from 'ngx-alerts';



@Component({
  selector: 'app-staffhomepage',
  templateUrl: './staffhomepage.component.html',
  styleUrls: ['./staffhomepage.component.scss']
})
export class StaffhomepageComponent implements OnInit, OnDestroy {
  
attendance = new StaffAttendance
timer
AttendanceCollection: AngularFirestoreCollection
update: AngularFirestoreDocument
  scheduleReference: AngularFirestoreCollection
  staffReference: AngularFirestoreDocument
  schedule: Schedule[] = []
  schedlength
  myname;
  mysurname;
  date = new Date()
  onduty
  myuid: string
timenow;
  sideBarOpen = true  
  constructor(private alert: AlertService, private afauth: AngularFireAuth, private auth: AuthserviceService, private afstore: AngularFirestore) {
    this.afauth.authState.subscribe(user => {
      if (user && user.uid) {

            this.myuid = user.uid
          this.scheduleReference = this.afstore.collection(`staff/${user.uid}/myschedule`, ref => ref.orderBy('date', 'desc'))
          this.AttendanceCollection = this.afstore.collection('Attendance')
          this.staffReference = this.afstore.doc(`staff/${this.myuid}`)

          this.staffReference.valueChanges().subscribe(data => {
                this.myname = data.name
                this.mysurname = data.surname
                this.onduty = data.onduty
          })

          this.scheduleReference.snapshotChanges()
          .pipe(map(actions => actions.map(a => {
            return {
              id: a.payload.doc.id,
              ...a.payload.doc.data() as any
            }
          }))).subscribe(data => {
            this.schedule = data;
            this.schedlength = data.length

          })



      }
    })
    
   }


   

   timein(date, from, to, id, staff) {
let petsa = new Date()
    this.attendance.staffname = staff
    this.attendance.dateschedule = date
    this.attendance.from = from
    this.attendance.to = to
    this.attendance.date = petsa.toDateString() 
    this.attendance.timein =  new Date().toLocaleString()
    this.attendance.timefromnow = Date.now()

    this.attendance.read = false
    
    
    
    this.AttendanceCollection.add({
      staffname: this.attendance.staffname,
        dateschedule: this.attendance.dateschedule,
        from: this.attendance.from,
        date: this.attendance.date,
        to: this.attendance.to,
        timein: this.attendance.timein,
        timefromnow: this.attendance.timefromnow,
        read: this.attendance.read
      })

      this.update = this.afstore.doc(`staff/${this.myuid}/myschedule/${id}`)

      this.update.update({
        timein: true
      })
      this.afstore.collection('staff')
      .doc(`${this.myuid}`)
      .update({
        onduty: true
      })

        this.afstore.collection('staff').doc(`${this.myuid}`).collection('mytotalattendance')
        .add({
          staffname: this.attendance.staffname,
          dateschedule: this.attendance.dateschedule,
          from: this.attendance.from,
          date: this.attendance.date,
          to: this.attendance.to,
          timein: this.attendance.timein,
          timefromnow: this.attendance.timefromnow,
          read: this.attendance.read
        })



      this.alert.info('You successfully time in. The admin will see the exact time that you time in.')



  
  
  }

  timeout(date, from, to, id, staff) {
    let petsa = new Date()
    
    this.attendance.staffname = staff
    this.attendance.dateschedule = date
    this.attendance.from = from
    this.attendance.to = to
    this.attendance.date = petsa.toDateString()
    this.attendance.timeout =  new Date().toLocaleString()
    this.attendance.timefromnow = Date.now()

    this.attendance.read = false
  
  
    this.AttendanceCollection.add({
      staffname: this.attendance.staffname,
      dateschedule: this.attendance.dateschedule,
      from: this.attendance.from,
      date: this.attendance.date,
      to: this.attendance.to,
      timeout: this.attendance.timeout,
      timefromnow: this.attendance.timefromnow,
      read: this.attendance.read
    })
    this.update = this.afstore.doc(`staff/${this.myuid}/myschedule/${id}`)


    this.update.update({
      finish: true,
      timein: false,
      timeout: true
    })

    
    this.afstore.collection('staff')
    .doc(`${this.myuid}`)
    .update({
      onduty: false
    })
    this.afstore.collection('staff').doc(`${this.myuid}`).collection('mytotalattendance')
    .add({
      staffname: this.attendance.staffname,
      dateschedule: this.attendance.dateschedule,
      from: this.attendance.from,
      date: this.attendance.date,
      to: this.attendance.to,
      timeout: this.attendance.timeout,
      timefromnow: this.attendance.timefromnow,
      read: this.attendance.read
    })

    this.alert.info('You successfully time out. The admin will see the exact time that you time out.')


  
  }




  
  ngOnInit(): void {
   this.timer = setInterval(() => {
      this.date = new Date();
   }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer)
  }

  
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen
  }

  logout() {
    this.auth.SignOut()
  }



}
