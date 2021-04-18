import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { unzipSync } from 'zlib';

@Component({
  selector: 'app-dialogmessage',
  templateUrl: './dialogmessage.component.html',
  styleUrls: ['./dialogmessage.component.scss']
})
export class DialogmessageComponent implements OnInit {
  reply
  constructor(private afauth: AngularFireAuth) {
    this.afauth.authState.subscribe(user => {
      if (user && user.uid) {
        
      }
    })
   }

  ngOnInit(): void {
  }

}
