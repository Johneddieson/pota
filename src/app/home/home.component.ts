import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthserviceService } from '../authservice.service';
import * as moment from 'moment'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private auth: AuthserviceService,  private afstore: AngularFirestore, private afauth: AngularFireAuth) {
      this.afauth.authState.subscribe(user => {

        if (user && user.uid) {

        
        }
      })


   }
  ngOnInit(): void {
    
    // let dte = new Date();
    // dte.setDate(dte.getDate())
    // console.log(dte.toDateString());
  }

  

  logout() {
    this.auth.SignOut()
  }

}
