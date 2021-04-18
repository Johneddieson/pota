import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.component.html',
  styleUrls: ['./edit-inventory.component.scss']
})
export class EditInventoryComponent implements OnInit {
id: string
addition
date
message
timefromnow
wholedate
  constructor(private router: Router, private actRoute: ActivatedRoute, private afauth: AngularFireAuth, private afstore: AngularFirestore) {
      this.afauth.authState.subscribe(user => {
        if (user && user.uid) {

            this.id = this.actRoute.snapshot.paramMap.get('id')

        this.afstore.collection('Inventory').doc(`${this.id}`)
        .get()
        .pipe(map(actions => {
          return {
            id: actions.id,
            ...actions.data() as any
          }
        })).subscribe(data => {
          this.addition = data.addition
          this.date = data.date
          this.message = data.message
          this.timefromnow = data.timefromnow
          this.wholedate = data.wholedate
          

        })
            


        }
      })

   }

  ngOnInit(): void {
  }

  edit() {

      this.afstore.collection('Inventory').doc(`${this.id}`)
      .update({
        message: this.message
      })

        this.router.navigateByUrl('/Inventoryforadmin')
  
    }

}
