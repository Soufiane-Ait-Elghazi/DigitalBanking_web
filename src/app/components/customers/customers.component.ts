import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {Customer} from "../../model/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{

  customers!: Array<Customer>;
  errorMessage! : String
  searchFormGroup!: FormGroup;
  constructor(private customerService : CustomerService, private fb:FormBuilder) {
  }

  ngOnInit(): void {
    this.onGetCustomers()
    this.searchFormGroup = this.fb.group({
      keyword :this.fb.control("keyword")
    })
  }
  onGetCustomers(){
    this.customerService.getCustomers().subscribe({
      next: (data) => {this.customers = data;},
      error: (err) => {this.errorMessage = err.message}
    });
  }
  onSearchCustomer(){
    this.customerService.searchCustomer(this.searchFormGroup.value.keyword).subscribe({
      next: (data) => {this.customers = data;},
      error: (err) => {this.errorMessage = err.message}
    });

  }



}
