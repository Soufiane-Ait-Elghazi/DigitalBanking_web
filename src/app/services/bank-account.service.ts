import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BankAccount} from "../model/bankAccount.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  constructor(private http : HttpClient) { }

  getBankAccounts():Observable<Array<BankAccount>> {
    return  this.http.get<Array<BankAccount>>("http://localhost:8086/BankAccount_JaxRS/bankAccounts");
  }

  saveSavingCustomer(bankAccount: BankAccount):Observable<BankAccount> {
     return this.http.post<BankAccount>("http://localhost:8086/BankAccount_JaxRS/saveSavingBankAccount/1",bankAccount) ;
  }

  saveCurrentCustomer(bankAccount: BankAccount):Observable<BankAccount> {
    return this.http.post<BankAccount>("http://localhost:8086/BankAccount_JaxRS/saveCurrentBankAccount/1",bankAccount) ;
  }

  searchAccounts(rib: string):Observable<Array<BankAccount>> {
    return this.http.get<Array<BankAccount>>("http://localhost:8086/BankAccount_JaxRS/bankAccounts/search?rib="+rib) ;
  }

  getCustomerBankAccount(id: number):Observable<Array<BankAccount>>{
    return this.http.get<Array<BankAccount>>("http://localhost:8086/Customer_JaxRS/customers/"+id+"/accounts") ;
  }

  deleteAccount(id: number):Observable<BankAccount> {
    return this.http.get<BankAccount>("http://localhost:8086/BankAccount_JaxRS/deleteBankAccount/"+id);
  }
}
