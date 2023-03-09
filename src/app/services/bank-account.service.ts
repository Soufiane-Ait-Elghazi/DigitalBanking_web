import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BankAccount} from "../model/bankAccount.model";
import {Observable} from "rxjs";
import {BankAccountType} from "../model/BankAccountType";
import {Customer} from "../model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  constructor(private http : HttpClient) { }

  getBankAccounts():Observable<Array<BankAccount>> {
    return  this.http.get<Array<BankAccount>>("http://localhost:8086/BankAccount_JaxRS/bankAccounts");
  }




  searchAccounts(rib: string):Observable<Array<BankAccount>> {
    return this.http.get<Array<BankAccount>>("http://localhost:8086/BankAccount_JaxRS/bankAccounts/search?rib="+rib) ;
  }

  getCustomerBankAccount(id: number):Observable<Array<BankAccount>>{
    return this.http.get<Array<BankAccount>>("http://localhost:8086/Customer_JaxRS/customers/"+id+"/accounts") ;
  }

  deleteAccount(id: number):Observable<BankAccount> {
    return this.http.delete<BankAccount>("http://localhost:8086/BankAccount_JaxRS/deleteBankAccount/"+id);
  }
  getAccountTypes():Observable<Array<BankAccountType>> {
    return  this.http.get<Array<BankAccountType>>("http://localhost:8086/BankAccount_JaxRS/bankAccounts/types");
  }

  saveAccount(bankAccountDto: BankAccount) {
    return this.http.post<BankAccount>("http://localhost:8086/BankAccount_JaxRS/saveBankAccount",bankAccountDto) ;
  }

  getBankAccount(id: any) :Observable<BankAccount>{
    return  this.http.get<BankAccount>("http://localhost:8086/BankAccount_JaxRS/bankAccounts/"+id);
  }

  editAccount(bankAccountDto: BankAccount) {
    return  this.http.put<BankAccount>("http://localhost:8086/BankAccount_JaxRS/updateBankAccount/"+bankAccountDto.id,bankAccountDto);

  }
}
