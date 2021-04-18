import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private afauth: AngularFireAuth) {

    this.afauth.authState.subscribe(user => {
      if (user && user.uid) {
        
      }
    })
   }

  ngOnInit(): void {
  }

}
