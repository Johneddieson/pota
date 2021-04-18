import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthserviceService } from '../authservice.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertService } from 'ngx-alerts';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
hide: string = 'password'
  Email: string
  pass: string
  cpass: string
  fullname: string
  completeaddress: string
  contact_number: string
  loading: boolean = false
error: boolean = false
err: string
display: string
  constructor(
    private auth: AuthserviceService, 
    private afstore: AngularFirestore,
    private afauth: AngularFireAuth,
      private alerService: AlertService,
      private router: Router,
      public dialog: MatDialog
    ) {
          this.afauth.authState.subscribe(data => {
            if (data && data.uid) {
                  this.display = data.displayName
            
            if (this.display == 'admin') 
        this.router.navigateByUrl('/admin')
      
       if (this.display == 'staff')
        this.router.navigateByUrl('/staffhomepage')
      
      
       if (this.display == 'customer') 
         this.router.navigateByUrl('/home')
     
            
                }
          })

     }

  ngOnInit(): void {
     
     
         


    document.querySelector('.img-btn').addEventListener('click', function() {
      document.querySelector('.cont').classList.toggle('s-signup')
    })
  
  
  }


  login(email, password) {
    this.auth.SignIn(email.value, password.value).then((res => {

      this.loading = true



      setTimeout(() => {
          this.loading = false
          if (res.user) {
              
          localStorage.setItem('user', JSON.stringify(res.user));
          JSON.parse(localStorage.getItem('user'));
      
              if (res.user.displayName == 'admin') {
                this.router.navigateByUrl('/admin')

              } else if (res.user.displayName == 'staff') {
                this.router.navigateByUrl('/staffhomepage')
              } else   {
                this.router.navigateByUrl('/home')
              } 

      
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }

      }, 3000);  
          


      email.value = ''
      password.value = ''
    })).catch(err => {
      this.loading = true
  

      setTimeout(() => {
          this.loading = false
        this.alerService.danger(err)

      }, 3000);
})
  }


  wew() {
  this.hide =  this.hide == 'text' ? 'password' : 'text'
  }



  signup() {

    
    
      this.auth.SignUp(this.Email, this.pass).then(res => {
        this.loading = true

        setTimeout(() => {
            res.user.updateProfile({
              displayName: 'customer'
            }).then(() => {
              this.loading = false
              localStorage.setItem('user', JSON.stringify(res.user));
              JSON.parse(localStorage.getItem('user'));
          
                
          this.afstore.doc(`users/${res.user.uid}`).set({
      
            email: this.Email,
            uid: res.user.uid,
              firstTime: true,
              mycart: firebase.default.firestore.FieldValue.arrayUnion('haha')
          })

          
            
      this.router.navigateByUrl('/home')
      
  
      this.Email= ''
      this.pass = ''
      
            })

         
  
        }, 3000);

            
            






      }).catch(err => {
        this.loading = true

        setTimeout(() => {
            this.loading = false
          this.alerService.danger(err)  
        }, 3000);

      })
              
    
  
  }
}
