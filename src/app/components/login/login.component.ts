import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {EventDriverService} from "../../services/event.driver.service";
import {AppActionsTypes, AppDataState} from "../../state/app.state";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mode!: number;
  loading!:boolean


  constructor(public authenticationService: AuthenticationService,
              private router: Router,
              private eventDriverService: EventDriverService) {}

  ngOnInit(): void {

  }

  onLogin(user: any) {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    this.authenticationService.login(user)
      .subscribe((resp:Tokens) => {
        const refreshToken = resp['refresh-token'];
        const accessToken = resp['access-token'];
        this.authenticationService.saveAccessToken(accessToken)
        this.authenticationService.saveRefreshToken(refreshToken)
        this.eventDriverService.publishEvent({
          type: AppActionsTypes.GET_AUTHENTICATED_USER,
          payload: this.authenticationService.getUsername()
        })
        this.router.navigateByUrl('/home')
      }, err => {
        this.mode = 1;
      });
  }


}
export interface Tokens {
  'access-token': string;
  'refresh-token': string;
}

export interface TokensR {
  'accessToken': string;
  'refreshToken': string;
}
