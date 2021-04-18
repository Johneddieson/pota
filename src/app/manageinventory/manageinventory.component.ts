import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Inventory } from '../inventory.model';
import * as moment from 'moment'

@Component({
  selector: 'app-manageinventory',
  templateUrl: './manageinventory.component.html',
  styleUrls: ['./manageinventory.component.scss']
})
export class ManageinventoryComponent implements OnInit {
  
  sideBarOpen = true 
// inventory: Inventory[] = []
today
todaylength
yesterday
yesterdaylength
onedayago
onedayagolength
twodayago
twodayagolength
threedayago
threedayagolength
fourdayago
fourdayagolength

fivedayago
fivedayagolength
sixdayago
sixdayagolength
sevendayago
sevendayagolength
inventoryCollection: AngularFirestoreCollection
  constructor(private afauth: AngularFireAuth, private afstore: AngularFirestore) {
      this.afauth.authState.subscribe(user => {
        if (user && user.uid) {
              //today
    let dte = new Date();
    dte.setDate(dte.getDate())


this.afstore.collection('Inventory', ref => ref.where('date', '==', dte.toDateString()).orderBy('timefromnow', 'desc'))
             .snapshotChanges()
                .pipe(map(actions => actions.map(a => {
                  return {
                    id: a.payload.doc.id,
                    ...a.payload.doc.data() as any
                  }
                }))).subscribe(data => {
                  this.today = data
                  this.todaylength = data.length
                })

                //yesterday
                let yesterday = new Date()
                yesterday.setDate(yesterday.getDate() - 1)

                this.afstore.collection('Inventory', ref => ref.where('date', '==', yesterday.toDateString()).orderBy('timefromnow', 'desc'))
             .snapshotChanges()
                .pipe(map(actions => actions.map(a => {
                  return {
                    id: a.payload.doc.id,
                    ...a.payload.doc.data() as any
                  }
                }))).subscribe(data => {
                  this.yesterday = data
                  this.yesterdaylength = data.length
                })

                //one day ago
                    let onedayago = new Date()
                    onedayago.setDate(onedayago.getDate() - 2)

                this.afstore.collection('Inventory', ref => ref.where('date', '==', onedayago.toDateString()).orderBy('timefromnow', 'desc'))
                .snapshotChanges()
                   .pipe(map(actions => actions.map(a => {
                     return {
                       id: a.payload.doc.id,
                       ...a.payload.doc.data() as any
                     }
                   }))).subscribe(data => {
                     this.onedayago = data
                     this.onedayagolength = data.length
                   })

                   //two days ago
                      let twodayago = new Date()
                      twodayago.setDate(twodayago.getDate() - 3)


                   this.afstore.collection('Inventory', ref => ref.where('date', '==', twodayago.toDateString()).orderBy('timefromnow', 'desc'))
                   .snapshotChanges()
                      .pipe(map(actions => actions.map(a => {
                        return {
                          id: a.payload.doc.id,
                          ...a.payload.doc.data() as any
                        }
                      }))).subscribe(data => {
                        this.twodayago = data
                        this.twodayagolength = data.length
                      })

                      //three days ago
                          let threedayago = new Date()
                          threedayago.setDate(threedayago.getDate() - 4)

                      this.afstore.collection('Inventory', ref => ref.where('date', '==', threedayago.toDateString()).orderBy('timefromnow', 'desc'))
                      .snapshotChanges()
                         .pipe(map(actions => actions.map(a => {
                           return {
                             id: a.payload.doc.id,
                             ...a.payload.doc.data() as any
                           }
                         }))).subscribe(data => {
                           this.threedayago = data
                           this.threedayagolength = data.length
                         })

                         //four days ago
                         let fourdayago = new Date()
                         fourdayago.setDate(fourdayago.getDate() - 5)

                         this.afstore.collection('Inventory', ref => ref.where('date', '==', fourdayago.toDateString()).orderBy('timefromnow', 'desc'))
                         .snapshotChanges()
                            .pipe(map(actions => actions.map(a => {
                              return {
                                id: a.payload.doc.id,
                                ...a.payload.doc.data() as any
                              }
                            }))).subscribe(data => {
                              this.fourdayago = data
                              this.fourdayagolength = data.length
                            })

                            //five days ago
                            let fivedayago = new Date()
                            fivedayago.setDate(fivedayago.getDate() - 6)

                            
                         this.afstore.collection('Inventory', ref => ref.where('date', '==', fivedayago.toDateString()).orderBy('timefromnow', 'desc'))
                         .snapshotChanges()
                            .pipe(map(actions => actions.map(a => {
                              return {
                                id: a.payload.doc.id,
                                ...a.payload.doc.data() as any
                              }
                            }))).subscribe(data => {
                              this.fivedayago = data
                              this.fivedayagolength = data.length
                            })

                            //six days ago

                            let sixdayago = new Date()
                            sixdayago.setDate(sixdayago.getDate() - 7)

                            this.afstore.collection('Inventory', ref => ref.where('date', '==', sixdayago.toDateString()).orderBy('timefromnow', 'desc'))
                            .snapshotChanges()
                               .pipe(map(actions => actions.map(a => {
                                 return {
                                   id: a.payload.doc.id,
                                   ...a.payload.doc.data() as any
                                 }
                               }))).subscribe(data => {
                                 this.sixdayago = data
                                 this.sixdayagolength = data.length
                               })


                               //seven days ago
                               let sevendayago = new Date()
                               sevendayago.setDate(sevendayago.getDate() - 8)

                               this.afstore.collection('Inventory', ref => ref.where('date', '==', sevendayago.toDateString()).orderBy('timefromnow', 'desc'))
                            .snapshotChanges()
                               .pipe(map(actions => actions.map(a => {
                                 return {
                                   id: a.payload.doc.id,
                                   ...a.payload.doc.data() as any
                                 }
                               }))).subscribe(data => {
                                 this.sevendayago = data
                                 this.sevendayagolength = data.length
                               })



        }
      })



   }

   TimeFromNow(time) {
     return moment(time).fromNow()
   }

  ngOnInit(): void {
//     var date = new Date();

// let wak =    ((date.getMonth() > 8) ? (date.getMonth() + 1) : ((date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() :  '0' + ( date.getDate())) + '/' + date.getFullYear();

// console.log(wak)
 
  }

  
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen
  }

}
