import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-editnews',
  templateUrl: './editnews.component.html',
  styleUrls: ['./editnews.component.scss']
})
export class EditnewsComponent implements OnInit {
newsReference: AngularFirestoreDocument
sub
id: string

sideBarOpen = true  

category
date
description
photo
time
title
 modelcategory
 modeldate
 modeldescription
 modelphoto
 modeltime
 modeltitle




@ViewChild('fileBtn') fileBtn
  constructor(private http: HttpClient, private afauth: AngularFireAuth,
    private alers: AlertService,

    private act: ActivatedRoute, private afstore: AngularFirestore, private router: Router) {
      this.afauth.authState.subscribe(user => {
        if (user && user.uid) {
            this.id = act.snapshot.paramMap.get('id')
         
          this.newsReference = this.afstore.collection('News').doc(`${this.id}`)

          this.sub = this.newsReference.get().pipe(
            map(actions => {
              return {
                id: actions.id,
                ...actions.data() as any
              }
            })
          ).subscribe(data => {
            this.category = data.category
            this.date = data.date
            this.description = data.description
            this.photo = data.photo
            this.time = data.time
            this.title = data.title

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
         o[prop].file
      
      
        
  for (const wak of files) {
    wak.name
 
      this.photo = `https://ucarecdn.com/${o[prop].file}/${wak.name}`
      
  }

        }
  

  
  
  
  
  
  
  
      })
    }
    edit() {
      
      this.newsReference.update({
        title: this.title,
        description: this.description,
        photo: this.photo,
        time: Date.now(),
        edited: true
      })


      this.alers.success(`${this.category} Updated Successfully`)

      this.router.navigateByUrl('/admin')



    }  

}
