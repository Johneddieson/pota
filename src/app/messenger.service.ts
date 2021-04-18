import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
cartSubject = new Subject<any>()

time = new Subject<any>()


  constructor() { }




  

}
