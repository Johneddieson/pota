import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {ExportAsService, ExportAsConfig} from 'ngx-export-as'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-jpeg',
  templateUrl: './jpeg.component.html',
  styleUrls: ['./jpeg.component.scss']
})
export class JpegComponent implements OnInit {
meReference: AngularFirestoreDocument
sub
final: boolean = false
title 
paragraph

sideBarOpen = true


exportasConfig: ExportAsConfig = {
  type: "png",
  
  elementIdOrContent: 'element'
}


  constructor(private afstore: AngularFirestore, private exportAsService: ExportAsService, private afauth: AngularFireAuth) {
    this.afauth.authState.subscribe(user => {
      if (user && user.uid) {

          this.meReference = this.afstore.collection('staff').doc(`${user.uid}`)


      }
    })
   }

  ngOnInit(): void {
  }

finalize() {
  this.final = true
}

sideBarToggler() {
  this.sideBarOpen = !this.sideBarOpen
}

  download() {

      this.sub = this.meReference.get()
      .pipe(map(actions => {
        return {
          id: actions.id,
          ...actions.data() as any
        }
      })).subscribe(data => {
        
        var date = new Date()
    this.exportAsService.save(this.exportasConfig, `${data.name} ${data.surname} Report Today ${date.toDateString()}`).subscribe(() => {
        
    }) 

    this.exportAsService.get(this.exportasConfig).subscribe(content => {
      
    })

    
    this.paragraph = ''
    this.title = ''
    this.final = false




      })


  }

}
