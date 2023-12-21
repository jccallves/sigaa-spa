import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "../auth/authentication.service";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class HttpHeaderRequestInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentUser = this.authenticationService.currentUser;
    const token = this.authenticationService.getToken()
    const isLoggedIn = currentUser && token;
    const isApiUrl = request.url.startsWith(environment.apiUrl);

    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': environment.apiUrl,
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
            'Access-Control-Allow-Origin': environment.apiUrl,
        }
      });
    }

    return next.handle(request);
  }

}
