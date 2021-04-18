import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(private router: Router, private authservice: AuthserviceService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authservice.isLoggedIn) {
      return true
    } 
    this.router.navigateByUrl('/login')
    return false
  }
  
}
