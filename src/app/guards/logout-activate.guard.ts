import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class LogoutActivateGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(): boolean {
    // console.log(this.authService.isLogin());
    if(!this.authService.isLogin()){
      // console.log(true);
      return true;
    }else{
      // console.log(false);
      this.router.navigateByUrl('/inicio')
      return false;
    }
  }
}
