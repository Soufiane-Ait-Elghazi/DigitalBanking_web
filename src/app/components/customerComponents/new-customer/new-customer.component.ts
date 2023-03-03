import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../../services/customer.service";
import {Customer} from "../../../model/customer.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent {
  newCustomerFormGroup!: FormGroup;
  savedCustomer!: Customer;
  errorMessage!: String;


  constructor(private customerService : CustomerService, private fb:FormBuilder,private router :Router) {
    this.newCustomerFormGroup = this.fb.group({
      name : this.fb.control("",[Validators.required,Validators.maxLength(10),Validators.minLength(4)]),
      email : this.fb.control("",[Validators.required,Validators.email]),
      address : this.fb.control("",[Validators.required,Validators.minLength(4)]),
      city : this.fb.control("",[Validators.required,Validators.maxLength(15),Validators.minLength(4)]),
      countryCode : this.fb.control("",[Validators.required,Validators.maxLength(3) ,Validators.minLength(3)])
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
       error: (err) => {this.errorMessage = err.message}
     });
  }



}


