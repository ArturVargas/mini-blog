import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(public router: Router, public authSvc: AuthService) {}

  canActivate() {
    if(this.authSvc.isLogged()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }
  
}
