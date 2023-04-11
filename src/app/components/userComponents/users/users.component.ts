import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../../model/User";
import {UserService} from "../../../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AppActionsTypes} from "../../../state/app.state";
import {AuthenticationService} from "../../../services/authentication.service";
import {EventDriverService} from "../../../services/event.driver.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  errorMessage!: string;
  showNotModal!: boolean;
  searchFormGroup!: FormGroup;
  users!: Array<User>;
  p:number = 1;

  constructor(private userService :UserService,
              private authenticationService:AuthenticationService,
              private fb:FormBuilder,
              private eventDriverService:EventDriverService) {
  }

  ngOnInit(): void {
    this.onGetUsers()
    this.searchFormGroup = this.fb.group({
      keyword :this.fb.control("")
    })
  }

  changeNote($event: boolean) {

  }

  onGetUsers() {

      this.userService.getUsers().subscribe({
        next: (data) => {
          this.users = data;
          this.p = 1
        },
        error: (err: HttpErrorResponse) => {
          if(err.status == 403) {
            if(!this.authenticationService.isAuthenticated()){
              this.showNotModal = true
            }else{
              this.onGetUsers()
            }
          }else{
            this.eventDriverService.publishEvent({type: AppActionsTypes.GET_AUTHENTICATED_USER, payload: this.authenticationService.getUsername()})
            this.errorMessage = err.message
          }}
      });
  }

  onSearchUser() {

  }

  onDeleteUser(id: number) {

  }

  onEditUser(user: User) {

  }


}
