import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "../auth/authentication.service";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError(err => {
          if (err.status === 401) {
              // auto logout if 401 response returned from api
              this.authenticationService.logout();
              location.reload();
          }
          const error = err.error || err.error.message || err.statusText;
          return throwError(error);
      }))
  }
}
