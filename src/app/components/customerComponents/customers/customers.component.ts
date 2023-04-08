import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../../services/customer.service";
import {Customer} from "../../../model/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {EventDriverService} from "../../../services/event.driver.service";
import {CustomerActionsTypes} from "../../../state/customer.state";
import {HttpErrorResponse} from "@angular/common/http";

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
              private eventDriverService : EventDriverService) {
  }

  ngOnInit(): void {
    this.onGetCustomers()
    this.searchFormGroup = this.fb.group({
      keyword :this.fb.control("")
    })
  }
  onGetCustomers(){
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
          this.p = 1
        },
      error: (err: HttpErrorResponse) => {
        if(err.status == 403) {
          this.showNotModal = true
        }else{
          this.errorMessage = err.message
        }}
    });
  }
  onSearchCustomer(){
    this.customerService.searchCustomer(this.searchFormGroup.value.keyword).subscribe({
      next: (data) => {this.customers = data;},
      error: (err) => {this.errorMessage = err.message}
    });

  }


  onDeleteCustomer(customerId: number) {
    this.custID = customerId
    this.showConfirmModal = true
  }

  onViewCustomer(customer: Customer) {
    this.eventDriverService.publishEvent({type:CustomerActionsTypes.VIEW_CUSTOMER,payload:customer});
    this.router.navigateByUrl("view-customer/"+customer.id)
  }

  onEditCustomer(customer: Customer) {
    this.eventDriverService.publishEvent({type:CustomerActionsTypes.EDIT_CUSTOMER,payload:customer});
    this.router.navigateByUrl("edit-customer/"+customer.id)
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
        error: (err) => {this.errorMessage = err.message}
      });
    }
  }

  changeNote($event: boolean) {

  }
}
