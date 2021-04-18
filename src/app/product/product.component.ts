import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  sideBarOpen: boolean = true
productDocument: AngularFirestoreDocument
sub

loading: boolean = false
id: string
name;
description;
price;
glass_price
pitcher_price
whole_price
slice_price
redbull_price
sevenup_price
photoname;
file;
date

@ViewChild('fileBtn') fileBtn

  constructor(private http: HttpClient, private afauth: AngularFireAuth, private actRoute: ActivatedRoute, private afstore: AngularFirestore) {
this.afauth.authState.subscribe(user => {

    if (user && user.uid) {
      
  this.id = this.actRoute.snapshot.paramMap.get('id')

   this.productDocument =   this.afstore.doc(`Product/${this.id}`)

   this.sub = this.productDocument.valueChanges().subscribe(data => {
    this.file = data.file
    this.photoname = data.photoname
    this.sevenup_price = data.sevenup_price
    this.redbull_price = data.redbull_price
    this.slice_price = data.slice 
    this.whole_price = data.whole
    this.pitcher_price = data.pitcher
    this.glass_price = data.glass
    this.name = data.name
     this.description = data.description
     this.price = data.price
   
  
  
  })
 


}



})


   }

  ngOnInit(): void {
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen
  }

  
  updateProfilePic() {
    this.fileBtn.nativeElement.click()
  }  

  

  fileChanged(event) {
    const files = event.target.files
    const data = new FormData()
    data.append('file', files[0])
      data.append('UPLOADCARE_STORE', '1')
      data.append('UPLOADCARE_PUB_KEY', '00fb1c6ab7c377f68517')
    this.http.post('https://upload.uploadcare.com/base/', data).subscribe((event: any) => {
      var o = {event}
  
      for (var prop in o) {
        this.file = o[prop].file
      }
  
  
  
  for (const wak of files) {
    this.photoname = wak.name
  }
  
  
  
  
  
      })
    }

    edit() {

      this.loading = true
          
      this.productDocument.update({
        name: this.name,
        description: this.description,
        price: this.price,
        file: this.file,
        photoname: this.photoname
      })

     

     

   
   setTimeout(() => {
     this.loading = false
   }, 3000);
   
    }


}
