import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../../services/customer.service";
import {Customer} from "../../../model/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

import {HttpErrorResponse} from "@angular/common/http";
import {AuthenticationService} from "../../../services/authentication.service";
import {AppActionsTypes} from "../../../state/app.state";
import {EventDriverService} from "../../../services/event.driver.service";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{

  customers!: Array<Customer>;
  errorMessage! : String
  searchFormGroup!: FormGroup;
  private deletedCustomer!: Customer;
  p: number= 1;
  showConfirmModal!:boolean;
  private conf !: boolean;
  private custID!: number;
  showNotModal!: boolean;
  constructor(private customerService : CustomerService,
              private fb:FormBuilder,
              private router:Router,
              private authenticationService:AuthenticationService,
              private eventDriverService:EventDriverService) {
  }

  ngOnInit(): void {
    this.onGetCustomers()
    this.searchFormGroup = this.fb.group({
      keyword :this.fb.control("")
    })
  }
  onGetCustomers(){-
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
          this.p = 1
        },
      error: (err: HttpErrorResponse) => {
        if(err.status == 403) {
          if(!this.authenticationService.isAuthenticated()){
            this.showNotModal = true
          }else{
            this.onGetCustomers()
          }
        }else{
          this.eventDriverService.publishEvent({type: AppActionsTypes.GET_AUTHENTICATED_USER, payload: this.authenticationService.getUsername()})
          this.errorMessage = err.message
        }}
    });
  }
  onSearchCustomer(){
    this.customerService.searchCustomer(this.searchFormGroup.value.keyword).subscribe({
      next: (data) => {this.customers = data;},
      error: (err: HttpErrorResponse) => {
        if(err.status == 403) {
          if(!this.authenticationService.isAuthenticated()){
            this.showNotModal = true
          }else{
            this.onSearchCustomer()
          }
        }else{
          this.eventDriverService.publishEvent({
            type: AppActionsTypes.GET_AUTHENTICATED_USER,
            payload: this.authenticationService.getUsername()
          })
          this.errorMessage = err.message
        }}
    });

  }


  onDeleteCustomer(customerId: number) {
    this.custID = customerId
    this.showConfirmModal = true
  }

  onViewCustomer(customer: Customer) {
    if(this.authenticationService.isAuthenticated()){
      this.eventDriverService.publishEvent({
        type: AppActionsTypes.GET_AUTHENTICATED_USER,
        payload: this.authenticationService.getUsername()
      })
      this.router.navigateByUrl("view-customer/"+customer.id)
    }

  }

  onEditCustomer(customer: Customer) {
    if(this.authenticationService.isAuthenticated()){
      this.eventDriverService.publishEvent({
        type: AppActionsTypes.GET_AUTHENTICATED_USER,
        payload: this.authenticationService.getUsername()
      })
      this.router.navigateByUrl("edit-customer/"+customer.id)
    }

  }


  change($event: boolean) {
    this.showConfirmModal = $event
    if($event==true){
      this.showConfirmModal =! $event
      this.customerService.deleteCustomer(this.custID).subscribe({
        next: (data) => {
          this.deletedCustomer = data;
          this.onGetCustomers()
        },
        error: (err: HttpErrorResponse) => {
          if(err.status == 403) {
            if(!this.authenticationService.isAuthenticated()){
              this.showNotModal = true
            }else{

              this.onDeleteCustomer(this.custID)
            }

          }else{
            this.eventDriverService.publishEvent({
              type: AppActionsTypes.GET_AUTHENTICATED_USER,
              payload: this.authenticationService.getUsername()
            })
            this.errorMessage = err.message
          }}
      });
    }
  }

  changeNote($event: boolean) {
  }
}
