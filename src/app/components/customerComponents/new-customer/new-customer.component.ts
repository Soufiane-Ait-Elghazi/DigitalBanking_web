import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../../services/customer.service";
import {Customer} from "../../../model/customer.model";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorDto} from "../../../model/error.model";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent {
  newCustomerFormGroup!: FormGroup;
  savedCustomer!: Customer;
  errorMessages!: string[];
  error!: ErrorDto;
  errorMessage!: string;


  constructor(private customerService : CustomerService, private fb:FormBuilder,private router :Router) {
    this.newCustomerFormGroup = this.fb.group({
      firstName : this.fb.control(""),
      lastName : this.fb.control(""),
      cin : this.fb.control(""),
      birthDate : this.fb.control(""),
      email : this.fb.control(""),
      phoneNumber : this.fb.control(""),
      address : this.fb.control(""),
      city : this.fb.control(""),
      countryCode : this.fb.control(""),
    })
  }

  onSaveCustomer() {
     let customer :Customer = this.newCustomerFormGroup.value ;
     this.customerService.saveCustomer(customer).subscribe({
        next:(data) => {
         this.savedCustomer = data;
         alert("Customer has been successfully saved !")
         this.newCustomerFormGroup.reset();
         this.router.navigateByUrl("/customers")
        },
       error: (err: HttpErrorResponse) => {
          if(err.status == 400) {
            this.error = err.error
            this.errorMessages = this.error.errors
            this.errorMessage = this.error.errorDescription
          }
       }
     });
  }


  reload() {
    this.newCustomerFormGroup.reset()
  }
}


