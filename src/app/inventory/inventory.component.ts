import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
Inventory: any[] = []
sideBarOpen: boolean = true
willedit: boolean = false


  constructor(private router: Router, private afauth: AngularFireAuth, private afstore: AngularFirestore) {

      this.afauth.authState.subscribe(user => {
        if (user && user.uid) {
            this.afstore.collection('Inventory', ref => ref.orderBy('timefromnow', 'desc'))
            .snapshotChanges()
            .pipe(map(actions => actions.map(a => {
              return {
                id: a.payload.doc.id,
                ...a.payload.doc.data() as any
              }
            }))).subscribe(data => {
                this.Inventory = data
            })
        }
      })

   }

  ngOnInit(): void {
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen
  }

  edit(id: string) {
    
      this.router.navigateByUrl(`/editInventory/${id}`)




  }
  delete(id: string) {
      this.afstore.collection('Inventory').doc(`${id}`)
      .delete()
  }

}
