import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-decreasedialog',
  templateUrl: './decreasedialog.component.html',
  styleUrls: ['./decreasedialog.component.scss']
})
export class DecreasedialogComponent implements OnInit {
  stock;
  constructor(private afauth: AngularFireAuth
   ) {
this.afauth.authState.subscribe(user => {

  if (user && user.uid) {


    
  }
})


   }

  ngOnInit(): void {
  }

}
