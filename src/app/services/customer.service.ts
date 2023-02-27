import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customers : any
  constructor(private http : HttpClient){ }

  public getCustomers():Observable<Array<Customer>>{
    return  this.http.get<Array<Customer>>("http://localhost:8086/Customer_JaxRS/customers");
  }

  searchCustomer(keyword:String):Observable<Array<Customer>> {
    return  this.http.get<Array<Customer>>("http://localhost:8086/Customer_JaxRS/customers/search?keyword="+keyword);
  }

  saveCustomer(customer:Customer):Observable<Customer> {
    console.log(customer)
    return  this.http.post<Customer>("http://localhost:8086/Customer_JaxRS/saveCustomer",customer);
  }
}
