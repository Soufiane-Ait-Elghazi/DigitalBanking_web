import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {EventDriverService} from "../../services/event.driver.service";
import {Observable} from "rxjs";
import {ActionEvent, AppActionsTypes, AppDataState} from "../../state/app.state";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  authenticatedUser: Observable<AppDataState<any>> | null = null;

  constructor(private authenticationService: AuthenticationService, private eventDriverService: EventDriverService) {

  }


  ngOnInit(): void {
    this.eventDriverService.sourceEventSubjectObservable.subscribe((actionEvent: ActionEvent) => {
      this.onActionEvent(actionEvent);
    })
  }

  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case AppActionsTypes.GET_AUTHENTICATED_USER:
        this.authenticatedUser = $event.payload;
        break;
    }
  }



    onlogOut() {
      this.authenticationService.logOut();}
}
