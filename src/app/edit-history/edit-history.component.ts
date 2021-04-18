import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-history',
  templateUrl: './edit-history.component.html',
  styleUrls: ['./edit-history.component.scss']
})
export class EditHistoryComponent implements OnInit {
  sideBarOpen: boolean = true
id: string
  
ref: AngularFirestoreDocument
SUB
file
photoname
category
customeraddress
customeraddress2
customeremail
customerfirstname
customerlastname
customernumber
date
name
price
quantity
subtotal
wholedate
@ViewChild('fileBtn') fileBtn
  constructor(private router: Router, private actRoute: ActivatedRoute, private http: HttpClient, private afauth: AngularFireAuth, private afstore: AngularFirestore) {
      this.afauth.authState.subscribe(user => {
        if (user && user.uid) {
              this.id = this.actRoute.snapshot.paramMap.get('id')


      this.ref =           this.afstore.collection('History').doc(`${this.id}`)
        
            this.SUB = this.ref.valueChanges().subscribe(data => {
              this.file = data.file
this.photoname = data.photoname
this.category = data.category
this.customeraddress = data.customeraddress
this.customeraddress2 = data.customeraddress2
this.customeremail = data.customeremail
this.customerfirstname = data.customerfirstname
this.customerlastname = data.customerlastname
this.customernumber = data.customernumber
this.date = data.date
this.name = data.name
this.price = data.price
this.quantity = data.quantity
this.subtotal = data.subtotal
this.wholedate = data.wholedate


              
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

      this.afstore.collection('History').doc(`${this.id}`)
      .update({
    file:    this.file,
    photoname: this.photoname,
    category: this.category,
customeraddress: this.customeraddress,
customeraddress2: this.customeraddress2,
customeremail: this.customeremail,
customerfirstname: this.customerfirstname,
customerlastname: this.customerlastname ,
customernumber: this.customernumber,
date: this.date,
name: this.name,
price: this.price,
quantity: this.quantity,
subtotal: this.subtotal,
wholedate: this.wholedate

      })

      this.router.navigateByUrl('/history')

   
    }

}
