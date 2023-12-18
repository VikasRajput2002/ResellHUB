import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

  
  export class authGuardGuard  {
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        
    
          if(localStorage.getItem('email')!==''&& localStorage.getItem('token')!='' || localStorage.getItem('userId')!='' || localStorage.getItem('userId')!=null) 
          return true;
          else
          return false
    }
  

};
