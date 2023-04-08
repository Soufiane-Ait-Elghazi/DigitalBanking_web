import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private jwToken!: any
  private roles: Array<any> = []
  private username!: string;

  constructor(private http: HttpClient) {
  }

  login(user: any) {
    return this.http.post("http://localhost:8086/login", user, {observe: 'response'});
  }

  public saveToken(jwt: any) {
    this.jwToken = jwt
    localStorage.setItem('token', jwt);
    let jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(jwt);
    const roles = decodedToken.roles;
    const username = decodedToken.sub
    this.username = username
    this.roles = roles
  }

  public getToken(): any {
    this.jwToken = localStorage.getItem('token');
    return this.jwToken;
  }

  public logOut() {
    this.jwToken = null
    localStorage.removeItem('token')

  }

  isAdmin(): boolean {
    for (let r of this.roles) {
      if (r == 'ADMIN')
        return true;
    }
    return false

  }

  getUsername() {
    this.jwToken = localStorage.getItem('token');
    let jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(this.jwToken);
    const username = decodedToken.sub
    this.username  = username
    return this.username;

  }
}
