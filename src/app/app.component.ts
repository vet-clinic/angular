import { Component } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vet-clinic-client';

     constructor(public oidcSecurityService: OidcSecurityService,public authService: AuthService) { }
     ngOnInit() {
     this.oidcSecurityService.checkAuth().subscribe((auth) => console.log('is authenticated', auth));
   }
}
