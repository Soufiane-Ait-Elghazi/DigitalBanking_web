import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../../services/customer.service";
import {Customer} from "../../model/customer.model";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{

  customers!: Array<Customer>;
  errorMessage! : String
  constructor(private customerService : CustomerService) {
  }

  ngOnInit(): void {this.onGetCustomers()  }
  onGetCustomers(){
    this.customerService.getCustomers().subscribe({
      next: (data) => {this.customers = data;},
      error: (err) => {this.errorMessage = err.message}
    });
  }
  onSearchCustomer(){
    this.customerService.searchCustomer().subscribe({
      next: (data) => {this.customers = data;},
      error: (err) => {this.errorMessage = err.message}
    });

  }



}
