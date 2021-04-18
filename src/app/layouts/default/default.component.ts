import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  constructor(private afauth: AngularFireAuth) {
      this.afauth.authState.subscribe(user => {
        if (user && user.uid) {
          
        }
      })


   }

  ngOnInit(): void {
  }

}
