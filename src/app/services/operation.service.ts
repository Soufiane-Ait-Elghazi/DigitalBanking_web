import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Customer} from "../model/customer.model";
import {BankAccountType} from "../model/BankAccountType";
import {AccountOperation} from "../model/operation";

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private http : HttpClient) { }



  saveDebitOperation(operationDto: any) :Observable<any>{
    return  this.http.post<AccountOperation>("http://localhost:8086/Transaction_JaxRS/retrait",operationDto);
  }
  saveCreditOperation(operationDto: any) :Observable<any>{
    return  this.http.post<AccountOperation>("http://localhost:8086/Transaction_JaxRS/virement",operationDto);
  }
  saveTransferOperation(operationDto: any) :Observable<any>{
    return  this.http.post<AccountOperation>("http://localhost:8086/Transaction_JaxRS/transfer",operationDto);
  }

  getOperations() : Observable<Array<AccountOperation>>{
    return  this.http.get<Array<AccountOperation>>("http://localhost:8086/AccountOperation_JaxRS/accountOperations");
  }

  getOperation(id: any) {
    return  this.http.get<AccountOperation>("http://localhost:8086/AccountOperation_JaxRS/accountOperations/"+id);
  }
}
