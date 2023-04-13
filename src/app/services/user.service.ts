import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {User, UserForm} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private authenticationService:AuthenticationService) { }

  getUsers() :Observable<Array<User>>{
    return  this.http.get<Array<User>>("http://localhost:8086/User_controler/users");
  }


  saveUser(user: UserForm):Observable<User> {
    return  this.http.post<User>("http://localhost:8086/User_controler/register",user);
  }

  editUser(user: UserForm):Observable<User> {
    return  this.http.put<User>("http://localhost:8086/User_controler/register/"+user.id,user);
  }

  getUser(id: number):Observable<User>{
    return  this.http.get<User>("http://localhost:8086/User_controler/users/"+id);
  }

  deleteUser(id: number) {
    return  this.http.delete<User>("http://localhost:8086/User_controler/deleteUser/"+id);
  }
}
