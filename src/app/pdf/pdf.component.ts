import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import  jspdf from 'jspdf'
import html2canvas from 'html2canvas'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnInit {
  title: string
  paragraph: string
  final: boolean = false
  
sideBarOpen = true
meReference: AngularFirestoreDocument
sub
  constructor(private afstore: AngularFirestore, private afauth: AngularFireAuth) {
      this.afauth.authState.subscribe(user => {
        if (user && user.uid) {
         this.meReference =   this.afstore.collection('staff').doc(`${user.uid}`)

         
        }
      })


   }

  ngOnInit(): void {
  }

  finalize() {
    this.final = true
    this.title
    this.paragraph


  }

  download() {

      this.sub = this.meReference.get().pipe(map(actions => {
        return {
          id: actions.id,
          ...actions.data() as any
        }
      })).subscribe(data => {

        var element = document.getElementById('table')
  
        html2canvas(element).then((canvas) => {
          console.log(canvas)
     
          var img = canvas.toDataURL('image/png')
    
          var doc = new jspdf()
    var imgHeight = canvas.height * 208 / canvas.width;
          doc.addImage(img, 0, 0, 208, imgHeight)
          var date = new Date()
          doc.save(`${data.name} ${data.surname} my report for today ${date.toDateString()}`)
    
    
          this.paragraph = ''
          this.title = ''
          this.final = false
        })

      })

    

}

sideBarToggler() {
  this.sideBarOpen = !this.sideBarOpen
}

}
