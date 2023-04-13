import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';
import {Tokens, TokensR} from "../components/login/login.component";
import {AppActionsTypes} from "../state/app.state";
import {EventDriverService} from "./event.driver.service";
import {AuToken} from "../model/operation";
import {Observable} from "rxjs";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private accessToken!: any
  refreshToken:any;
  private roles: Array<any> = []
  private username!: string;


  constructor(private http: HttpClient,private eventDriverService : EventDriverService,private router:Router) {
  }

  login(user: any){
    return this.http.post<Tokens>("http://localhost:8086/login", user);
  }

  saveAccessToken(accessToken: string) {

    this.accessToken = accessToken
    localStorage.setItem('accessToken', accessToken);
    let jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(accessToken);
    const roles = decodedToken.roles;
    const username = decodedToken.sub
    this.username = username
    this.roles = roles
  }

  saveRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken
    localStorage.setItem('refreshToken', refreshToken);
    let jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(this.accessToken);
    const roles = decodedToken.roles;
    const username = decodedToken.sub
    this.username = username
    this.roles = roles
  }

  public getAccessToken(){
    this.accessToken = localStorage.getItem('accessToken');
    return this.accessToken;
  }
  public getRefreshToken(){
    this.refreshToken = localStorage.getItem('refreshToken');
    return this.refreshToken;
  }


  public logOut() {
    this.accessToken = null
    this.refreshToken = null
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
     window.location.reload()
  }

  isAdmin(): boolean {
    for (let r of this.roles) {
      if (r == 'ADMIN')
        return true;
    }
    return false

  }

  getUsername() {
    this.accessToken = localStorage.getItem('accessToken');
    let jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(this.accessToken);
    const username = decodedToken.sub
    const fullName = decodedToken.fullName
    this.username  = fullName
    return this.username;

  }


  setAccessToken(accessToken: string) {
    this.accessToken = accessToken
    localStorage.removeItem('accessToken')
    this.saveAccessToken(accessToken)

  }

  isAuthenticated() {
    for (let r of this.roles) {
      if (r == 'USER')
        return true;
    }
    return false
  }

 getNewAccessToken(){
    console.log("refresh")
    let a = new AuToken()
    a.refreshToken ="Bearer "+ this.getRefreshToken()
    console.log(a)
    this.http.post<TokensR>("http://localhost:8086/User_controler/refreshToken",a).subscribe((resp:TokensR) => {
      const refreshToken = resp['refreshToken'];
      const accessToken = resp['accessToken'];
      this.saveAccessToken(accessToken)
      this.saveRefreshToken(refreshToken)
      this.eventDriverService.publishEvent({
        type: AppActionsTypes.GET_AUTHENTICATED_USER,
        payload: this.getUsername()
      })
    }, err => {
      console.log(err.message)
    });
  }

}
