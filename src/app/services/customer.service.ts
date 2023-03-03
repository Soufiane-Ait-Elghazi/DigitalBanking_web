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
  public getCustomer(id: string):Observable<Customer>{
    return  this.http.get<Customer>("http://localhost:8086/Customer_JaxRS/customers/"+id);
  }

  searchCustomer(keyword:String):Observable<Array<Customer>> {
    return  this.http.get<Array<Customer>>("http://localhost:8086/Customer_JaxRS/customers/search?keyword="+keyword);
  }

  saveCustomer(customer:Customer):Observable<Customer> {
    return  this.http.post<Customer>("http://localhost:8086/Customer_JaxRS/saveCustomer",customer);
  }

  deleteCustomer(customerId: number) {
    return  this.http.delete<Customer>("http://localhost:8086/Customer_JaxRS/deleteCustomer/"+customerId);
  }

  editCustomer(customer: Customer) {
    return  this.http.put<Customer>("http://localhost:8086/Customer_JaxRS/updateCustomer/"+customer.id,customer);
  }
}
