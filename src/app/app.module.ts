import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire'
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireFunctionsModule} from '@angular/fire/functions'
import {FormsModule} from '@angular/forms'
import {AlertModule} from 'ngx-alerts'
import {DefaultModule} from './layouts/default/default.module';
import {HttpClientModule} from '@angular/common/http';
import { AuthguardGuard } from './authguard.guard';






@NgModule({
  declarations: [
    AppComponent,
   ],
  imports: [
    BrowserModule,
    DefaultModule,
    HttpClientModule,
    AlertModule.forRoot({maxMessages: 20, timeout:5000, positionX: 'right', positionY: 'top'}),
    BrowserAnimationsModule,
    AngularFireFunctionsModule,
    
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDM3wrr_oTiNp2_TOGQe9VzD7KgOaDgV1c",
      authDomain: "ecommerce-3dc8b.firebaseapp.com",
      projectId: "ecommerce-3dc8b",
      storageBucket: "ecommerce-3dc8b.appspot.com",
      messagingSenderId: "733146179092",
      appId: "1:733146179092:web:ff70707093a444d730a901",
      measurementId: "G-V9DQ3P4ZHB"
    }),
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [AuthguardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
