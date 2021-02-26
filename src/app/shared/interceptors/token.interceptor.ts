import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Router } from '@angular/router';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private oidc: OidcSecurityService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
   {
    
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.oidc.getToken()}`
      }
    });
    
    return next.handle(request)
      .pipe(
        catchError((err: HttpErrorResponse) => {
            if (err && err.status === 401) {
                this.oidc.logoff();
                location.reload();
            }else if(err && err.status === 403){
                this.router.navigate(['/forbidden']);
            }

            //const error = err.error.message || err.statusText;
            return throwError(err);
        })
      );
  }
}