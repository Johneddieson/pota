import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AlertService } from 'ngx-alerts';
import * as moment from 'moment'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
loading: boolean = false
  title
  category
  description
  sideBarOpen = true  
  photo: string
  newsCollection: AngularFirestoreCollection
  
@ViewChild('fileBtn') fileBtn
  constructor(private alers: AlertService, private afstore: AngularFirestore, private http: HttpClient, private afauth: AngularFireAuth) {

    this.afauth.authState.subscribe(user => {
      if (user && user.uid) {
          this.newsCollection = this.afstore.collection('News')
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
        
  
        for (const wak of files) {
            this.photo = `https://ucarecdn.com/${o[prop].file}/${wak.name}`

      }
  
  
  
  }
  
  
  
  
  
      })
    }
    
    create() {

        if (this.title.length <= 10) {
          this.alers.danger('Title Must be greater than 20 characters.')
        } else if (this.description <= 50) {
          this.alers.danger('Description must be greater than 100 characters')
        }  else {
            this.loading = true

          this.newsCollection.add({
           category: this.category,
           title: this.title,
           description: this.description,
           time: Date.now(),
           date: moment().format('ll'),
           photo: this.photo
          })
        
        
            setTimeout(() => {
                  this.loading = false
                  this.alers.success('News Successfully Created')

                  this.category = ''
                  this.title = ''
                  this.description = ''
                  this.photo = ''
            }, 3000);
        
        }

    }

}
