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
import { Router } from '@angular/router';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
            //todo: create and use general error code page component
            if (error && error.status === 400) {
                //this.router.navigate(['/badrequest']);
            }else if(error && error.status === 500){
                //this.router.navigate(['/servererror']);
            }

          return throwError(error.message);
        })
      );
  }
}