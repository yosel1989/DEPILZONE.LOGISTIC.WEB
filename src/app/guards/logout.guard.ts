import { Injectable } from '@angular/core';
import {CanLoad, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) { }
  canLoad(): boolean {
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
