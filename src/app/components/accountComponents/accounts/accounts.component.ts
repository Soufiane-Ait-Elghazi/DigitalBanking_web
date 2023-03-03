import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {EventDriverService} from "../../../services/event.driver.service";
import {BankAccount} from "../../../model/bankAccount.model";
import {BankAccountService} from "../../../services/bank-account.service";



@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {
  bankAccounts!: Array<BankAccount>;
  bankAccountsItems!: Array<BankAccount>;
  errorMessage! : String
  searchFormGroup!: FormGroup;
  deletedBankAccount!: BankAccount;


  constructor(private bankAccountService : BankAccountService, private fb:FormBuilder, private router:Router, private eventDriverService : EventDriverService) {

  }

  ngOnInit(): void {
    this.onGetBankAccounts()
    this.searchFormGroup = this.fb.group({
      rib :this.fb.control("")
    })
  }
  onGetBankAccounts(){
    this.bankAccountService.getBankAccounts().subscribe({
      next: (data) => {
        this.bankAccounts = data;
        },
      error: (err) => {this.errorMessage = err.message}
    });
  }

  onSearchAccount() {
    this.bankAccountService.searchAccounts(this.searchFormGroup.value.rib).subscribe({
      next: (data) => {
        this.bankAccounts = data;
      },
      error: (err) => {this.errorMessage = err.message}
    });
  }


  onDeleteBankAccount(id: number) {
    this.bankAccountService.deleteAccount(id).subscribe({
      next: (data) => {
        this.deletedBankAccount = data;
      },
      error: (err) => {this.errorMessage = err.message}
    });
  }
}

