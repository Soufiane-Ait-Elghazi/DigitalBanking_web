import { Component } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(public authenticationService:AuthenticationService) {
  }

  onlogOut() {
    this.authenticationService.logOut();
  }
}
