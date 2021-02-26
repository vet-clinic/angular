import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  parsedJson: any;
  public userData: any;
  logedInResult!: boolean;
  constructor(public oidcSecurityService: OidcSecurityService,
    public http: HttpClient) {
    this.oidcSecurityService.userData$.subscribe((data) => {
      this.userData = data;
    });
  }

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe((auth) => console.log('is authenticated', auth));
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff();
  }

  isLogedIn(): boolean {
    this.oidcSecurityService.isAuthenticated$.subscribe((data) => {
      this.logedInResult = data;
    });

    return this.logedInResult;
  }

  isInRole(role: string) {
    if (this.userData != null && this.userData["role"] == role) {
      return true;
    }
    return false;
  }
}
