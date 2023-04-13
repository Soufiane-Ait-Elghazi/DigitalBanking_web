import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest} from "@angular/common/http";
import {from, Observable, switchMap} from "rxjs";
import {AuthenticationService} from "./authentication.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService {


  constructor(private authenticationService: AuthenticationService) {
  }

 intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
    let jwtHelper = new JwtHelperService();
    console.log("Request Http Interceptor ... ")
    if (!jwtHelper.isTokenExpired(this.authenticationService.getAccessToken())) {
      let req2 = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.authenticationService.getAccessToken()
        }
      });
      return next.handle(req2);
    } else if (jwtHelper.isTokenExpired(this.authenticationService.getAccessToken()) && req.url != "http://localhost:8086/User_controler/refreshToken") {
      this.authenticationService.getNewAccessToken()

      return next.handle(req)
    } else {
      if (jwtHelper.isTokenExpired(this.authenticationService.getRefreshToken())) console.log("REF EXP")
      return next.handle(req)
    }
  }



}


