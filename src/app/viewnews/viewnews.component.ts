import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment'

@Component({
  selector: 'app-viewnews',
  templateUrl: './viewnews.component.html',
  styleUrls: ['./viewnews.component.scss']
})
export class ViewnewsComponent implements OnInit {
id: string

Reference: AngularFirestoreDocument
sub
sideBarOpen = true  
title
description
category
photo
time

  constructor(private afstore: AngularFirestore, private afauth: AngularFireAuth, private actRoute: ActivatedRoute) {
      this.afauth.authState.subscribe(user => {
        if (user && user.uid) {
          this.id = this.actRoute.snapshot.paramMap.get('id')
        

          this.Reference = this.afstore.collection('News').doc(`${this.id}`)
          
            this.sub = this.Reference.valueChanges().subscribe(data => {
                this.title = data.title
                this.category = data.category
                this.description = data.description
                this.photo = data.photo
                this.time = data.time

            })
          
        }
      })


   }

   timefrom(date) {
      return moment(date).fromNow()
   }

  ngOnInit(): void {
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen
  }

}
