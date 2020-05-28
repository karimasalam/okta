import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';



@Injectable()
export class InterceptInterceptor implements HttpInterceptor {

  constructor(private oktaAuth: OktaAuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from( this.oktaAuth.getAccessToken())
    .pipe(
      mergeMap(token => {
        const tokenReq = request.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next.handle(tokenReq);
      })
     );
  }
}
