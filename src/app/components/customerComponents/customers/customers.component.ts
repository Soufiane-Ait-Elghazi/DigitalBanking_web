import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../../services/customer.service";
import {Customer} from "../../../model/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {EventDriverService} from "../../../services/event.driver.service";
import {CustomerActionsTypes} from "../../../state/customer.state";

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
      error: (err) => {this.errorMessage = err.message}
    });
  }
  onSearchCustomer(){
    this.customerService.searchCustomer(this.searchFormGroup.value.keyword).subscribe({
      next: (data) => {this.customers = data;},
      error: (err) => {this.errorMessage = err.message}
    });

  }


  onDeleteCustomer(customerId: number) {
    let conf = confirm("Are you sure ?")
    if(!conf) return;
    this.customerService.deleteCustomer(customerId).subscribe({
      next: (data) => {
        this.deletedCustomer = data;
        this.onGetCustomers()
        },
      error: (err) => {this.errorMessage = err.message}
    });
  }

  onViewCustomer(customer: Customer) {
    this.eventDriverService.publishEvent({type:CustomerActionsTypes.VIEW_CUSTOMER,payload:customer});
    this.router.navigateByUrl("view-customer/"+customer.id)
  }

  onEditCustomer(customer: Customer) {
    this.eventDriverService.publishEvent({type:CustomerActionsTypes.EDIT_CUSTOMER,payload:customer});
    this.router.navigateByUrl("edit-customer/"+customer.id)
  }
}
