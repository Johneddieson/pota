import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
fill
  @Output()  toggleSideBarForMe: EventEmitter<any> = new EventEmitter()
  constructor(private afauth: AngularFireAuth) {
      this.afauth.authState.subscribe(user => {
        if (user && user.uid) {
        }
      })


   }

  ngOnInit(): void {
    
  }

  bobo() {
    this.toggleSideBarForMe.emit(this.fill)
  }
  

}
