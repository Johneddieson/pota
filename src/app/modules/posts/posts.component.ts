import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as moment from 'moment'
import {Product} from 'src/app/product.model'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  name: string;
  produkto: AngularFirestoreCollection
  profilepic: any
  products = new Product
  
  loading: boolean = false
  sideBarOpen = true

  
@ViewChild('fileBtn') fileBtn
  constructor(private http: HttpClient, private afauth: AngularFireAuth, private afstore: AngularFirestore) {
    this.afauth.authState.subscribe(user => {
      if (user && user.uid) {
this.produkto = afstore.collection('Product')
      }

    })

   }

  ngOnInit(): void {

    
// var wak = new Date().toLocaleString()
// var day = moment(wak).toNow()

// console.log(day)
  }


  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen
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
      this.products.file = o[prop].file
    }


  // this.products.file = event.json()


for (const wak of files) {
  this.products.photoname = wak.name
}





    })
  }

  updateProfilePic() {
    this.fileBtn.nativeElement.click()
  }  
  submit() {

    this.loading = true
this.products.date = Date.now()
    this.products.stock = 0
    this.products.quantity = 1

  this.produkto.add({
    category: this.products.category,
      name: this.products.name,
    description: this.products.description,
    price: this.products.price,
    stock: this.products.stock,
    date: this.products.date,
    quantity: this.products.quantity,
    file: this.products.file,
    photoname: this.products.photoname

    })





this.products.category = ''
this.products.name = ''
this.products.description = ''
this.products.price = null
 this.products.file = ''
 this.products.photoname = ''


      setTimeout(() => {
            this.loading = false
      }, 3000);
          
      }
}
