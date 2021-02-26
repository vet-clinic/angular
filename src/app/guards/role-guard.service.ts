import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate{
  routeData: any;
  name: any;

  constructor(private authService: AuthService,
  private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    let roles = route.data["roles"] as Array<string>;
    let counter = 0;

    roles.forEach(element => {
      if(this.authService.isInRole(element)){
        counter++;
      }
    });

  	if(counter > 0){
  	  return true;
  	}

  	this.router.navigate(['forbidden']);
  	return false;
  }
}
