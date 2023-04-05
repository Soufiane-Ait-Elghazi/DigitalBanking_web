import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService {

  constructor(private authenticationService : AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Request Http Interceptor ...")

    if(!this.authenticationService.getToken()) return next.handle(req) ;

    let req2 = req.clone({
      setHeaders:{
        Authorization:'Bearer '+this.authenticationService.getToken()
      }
    });
    return next.handle(req2)
  }
}
