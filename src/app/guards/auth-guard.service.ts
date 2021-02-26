import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private oidc: OidcSecurityService) { }

  canActivate() {
    if (this.authService.isLogedIn()) {
      return true;
    }

    this.oidc.authorize();
    return false;
  }
}
