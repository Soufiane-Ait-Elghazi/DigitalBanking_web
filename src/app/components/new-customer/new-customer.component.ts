import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CustomerService} from "../../services/customer.service";
import {Customer} from "../../model/customer.model";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent {
  newCustomerFormGroup!: FormGroup;
  savedCustomer!: Customer;
  errorMessage!: String;
  constructor(private customerService : CustomerService, private fb:FormBuilder) {
    this.newCustomerFormGroup = this.fb.group({
      name : this.fb.control(""),
      email : this.fb.control(""),
      address : this.fb.control(""),
      city : this.fb.control(""),
      countryCode : this.fb.control("")
    })
  }

  onSaveCustomer() {
     let customer :Customer = this.newCustomerFormGroup.value ;
     this.customerService.saveCustomer(customer).subscribe({
       next: (data) => {this.savedCustomer = data;},
       error: (err) => {this.errorMessage = err.message}
     });
  }
}

