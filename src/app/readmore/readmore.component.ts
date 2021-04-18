import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-readmore',
  templateUrl: './readmore.component.html',
  styleUrls: ['./readmore.component.scss']
})
export class ReadmoreComponent implements OnInit {
id: string
Reference: AngularFirestoreDocument
sub
category
title
description
date
photo

  constructor(private afstore: AngularFirestore, private actRoute: ActivatedRoute) {
      this.id = actRoute.snapshot.paramMap.get('id')

      this.Reference = this.afstore.collection('News').doc(`${this.id}`)
      
      
      this.sub = this.Reference.valueChanges().subscribe(data => {
          this.photo = data.photo
        this.category = data.category
            this.title = data.title
            this.description = data.description
            this.date = data.date
      })



   }

  ngOnInit(): void {
  
  }

}
