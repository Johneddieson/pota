import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreModule } from '@angular/fire/firestore';
import {Document, Packer, Paragraph, Spacing } from 'docx'
import {saveAs} from 'file-saver'
@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {
   wew;
meReference: AngularFirestoreDocument
sub
myfullname
Title
paragraph

sideBarOpen = true  
  constructor(private afauth: AngularFireAuth, private afstore: AngularFirestore) {
    this.afauth.authState.subscribe(user => {
      if (user && user.uid) {
            this.meReference = this.afstore.collection(`staff`).doc(`${user.uid}`)


      }
    })
   }

   
  
  
   generateWordDocument() {


    this.sub = this.meReference.valueChanges().subscribe(data => {
      this.myfullname = `${data.name} ${data.surname}`


      window.setTimeout(() => {
        let doc = new Document();
            let date = new Date()
        doc.createParagraph(`${this.Title}`).title().center().spacing({
          after: 400
        })
        
        doc.createParagraph(`${this.paragraph}`).justified()
        

        this.saveDocumentToFile(
          doc,
          `${this.myfullname} Report ${date.toDateString()}.docx`
        );
      }, 2000);
    })

        
     
  
  }
  
   saveDocumentToFile(doc, fileName) {
    const packer = new Packer();
    const mimeType =
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    packer.toBlob(doc).then(blob => {
      const docblob = blob.slice(0, blob.size, mimeType);
      saveAs(docblob, fileName);
    });
  }

  ngOnInit(): void {
    
const button = document
.getElementById("button-word")

button.addEventListener("click", (event) => {
  event.preventDefault()


  this.generateWordDocument()
});
  }

  
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen
  }

}
