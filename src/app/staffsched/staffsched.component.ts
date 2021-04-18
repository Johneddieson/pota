import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AlertService } from 'ngx-alerts';
import { map } from 'rxjs/operators';
import {Schedule} from '../schedule.model'

@Component({
  selector: 'app-staffsched',
  templateUrl: './staffsched.component.html',
  styleUrls: ['./staffsched.component.scss']
})
export class StaffschedComponent implements OnInit {
 
 date = new Date()
 schedule = new Schedule

from: any
 sched: any

  sideBarOpen = true  
  staff: any[] = []
  firstname: string
  wew: number
staffcollection: AngularFirestoreCollection
staffReference: AngularFirestoreCollection
  constructor(private afauth: AngularFireAuth, private alerts: AlertService, private afstore: AngularFirestore) {

      this.afauth.authState.subscribe(user => {
        if (user && user.uid) {
              this.staffcollection = this.afstore.collection('staff')

              this.staffcollection.snapshotChanges()
              .pipe(map(actions => actions.map(a => {
                return {
                  id: a.payload.doc.id,
                  ...a.payload.doc.data() as any
                }
              }))).subscribe(data => {
                this.staff = data
              })
        }
      })

   }

  ngOnInit(): void {

// var date = new Date();

// let wak =    ((date.getMonth() > 8) ? (date.getMonth() + 1) : ((date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();


  }
  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }


  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen
  }

  result(email: string) {
    
    this.staffReference = this.afstore.collection(`staff/${email}/myschedule`)

  }

  setSchedule() {
  this.schedule.Date =  ((this.sched.getMonth() > 8) ? (this.sched.getMonth() + 1) : ((this.sched.getMonth() + 1))) + '/' + ((this.sched.getDate() > 9) ? this.sched.getDate() : ('0' + this.sched.getDate())) + '/' + this.sched.getFullYear()
 this.schedule.finish = false
 this.schedule.timein = false
 this.schedule.timeout = false

        this.staffReference.add({
          staff: this.schedule.staff,
          date: this.schedule.Date,
          from: this.schedule.From,
          to: this.schedule.To,
          timein: this.schedule.timein,
          timeout: this.schedule.timeout,
          finish: this.schedule.finish
        })

        this.alerts.info(`${this.schedule.staff} schedule has been set.`)

        this.sched = ''
        this.schedule.staff = ''
        this.schedule.Date = ''
        this.schedule.From = ''
        this.schedule.To = ''



 
 
  }
}
