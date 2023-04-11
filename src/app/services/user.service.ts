import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {User} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private authenticationService:AuthenticationService) { }

  getUsers() :Observable<Array<User>>{
    return  this.http.get<Array<User>>("http://localhost:8086/User_controler/users");
  }
}
