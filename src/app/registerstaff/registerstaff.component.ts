import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertService } from 'ngx-alerts';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-registerstaff',
  templateUrl: './registerstaff.component.html',
  styleUrls: ['./registerstaff.component.scss']
})
export class RegisterstaffComponent implements OnInit {

  sideBarOpen = true  
  hide = true;
  // hide: string = 'password'
    email: string;
    firstname: string
    surname: string
    password: string
  constructor(private afauth: AngularFireAuth, private afstore: AngularFirestore, 
    private alerService: AlertService) {
    this.afauth.authState.subscribe(user => {

      if (user && user.uid) {

      }
    })
   }

  ngOnInit(): void {
  }
  
  // wew() {
  //   this.hide =  this.hide == 'text' ? 'password' : 'text'
  //   }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen
  }


  registerstaff() {
    this.afauth.createUserWithEmailAndPassword(this.email, this.password).then(res => {
      
    
    res.user.updateProfile({
      displayName: 'staff'
    }).then(() => {

      
      this.afstore.doc(`staff/${res.user.uid}`).set({
        email: this.email,
        name: this.firstname,
        surname: this.surname,
        uid: res.user.uid,
        onduty: false
      })

      this.alerService.success(`You registered ${this.firstname} ${this.surname} successfully as a staff member.`)

      this.email = ''
      this.firstname = '' 
      this.surname = ''
        this.password = ''

   
    })        




    }).catch(err => {
      this.alerService.danger(err)
    })
  }

}
