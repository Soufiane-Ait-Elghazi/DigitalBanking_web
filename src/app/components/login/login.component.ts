import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  mode!: number;
  constructor(private authenticationService:AuthenticationService,private router:Router) {

  }

  ngOnInit(): void {
  }

  onLogin(user:any) {
    this.authenticationService.login(user)
      .subscribe(resp=>{
        let jwt = resp.headers.get('authorization')
        this.authenticationService.saveToken(jwt)
        this.router.navigateByUrl("/home")
      },err=>{
        this.mode = 1;
      });
  }


}
