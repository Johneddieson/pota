import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Approved } from '../approved.model';
import { AuthserviceService } from '../authservice.service';
import { MessengerService } from '../messenger.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
@Input() total: any
  cartItem:number = 0
  approvedCollection: AngularFirestoreCollection
  approved: Approved[] = []
  count

  
  constructor(private afstore: AngularFirestore, private afauth: AngularFireAuth, private auth: AuthserviceService, private msg: MessengerService) { 
      this.afauth.authState.subscribe(user => {
        if (user &&user.uid) {
            this.msg.cartSubject.subscribe((data) => {
              this.cartItem = data
            })

            this.approvedCollection = this.afstore.collection(`users/${user.uid}/approved`, ref => ref.orderBy('date', 'desc'))
           
            this.approvedCollection.snapshotChanges()
             .pipe(map(actions => actions.map(a => {
               return {
                 id: a.payload.doc.id,
                 ...a.payload.doc.data() as any
               } 
             })))
             .subscribe(data => {
               this.approved = data
             })
 
             this.afstore.collection(`users/${user.uid}/approved`, ref => ref.where('read', '==', false))
            
            .snapshotChanges()
             .pipe(map(actions => actions.map(a => {
               return {
                 id: a.payload.doc.id,
                 ...a.payload.doc.data() as any
               } 
             })))
             .subscribe(data => {
                 this.count = data.length
             })
 
            
        }
      })

  }

  ngOnInit(): void {
  this.cartItemFunc()
  

    //   let date = new Date()
    // var wak = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ((date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : '0' + (   date.getDate() - 1)) + '/' + date.getFullYear()
    //   console.log(wak)
    }

  cartItemFunc()
 {
   if (localStorage.getItem('localCart') != null) {
     var cartCount = JSON.parse(localStorage.getItem('localCart'))
     this.cartItem = cartCount.length
   }
 }

 signout() {
   this.auth.SignOut()

   
   localStorage.removeItem('localCart')
 }

  
}
