import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BankAccountService} from "../../../services/bank-account.service";
import {BankAccount} from "../../../model/bankAccount.model";

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent {
  newBankAccountFormGroup!: FormGroup;
  savedBankAccount!: BankAccount;
  errorMessage!: String;


  constructor(private bankAccountService : BankAccountService,
              private fb:FormBuilder,
              private router :Router) {

    this.newBankAccountFormGroup = this.fb.group({
        balance : this.fb.control("",[Validators.required]),
        interestRate : this.fb.control("",[Validators.required]),
        overDraft : this.fb.control("",[Validators.required]),
        accountType : this.fb.control("",[Validators.required ]),
        currency : this.fb.control("",[Validators.required])

    });
  }

  onSaveBankAccount() {
    let bankAccount :BankAccount = this.newBankAccountFormGroup.value ;
    if(bankAccount.accountType == "SAVING")
      this.bankAccountService.saveSavingCustomer(bankAccount).subscribe({
        next:(data) => {
          this.savedBankAccount = data;
          alert("Account has been successfully saved !")
          this.newBankAccountFormGroup.reset();
          this.router.navigateByUrl("/bank-accounts")
        },
        error: (err) => {this.errorMessage = err.message}
      });

    if(bankAccount.accountType == "CURRENT")
      this.bankAccountService.saveCurrentCustomer(bankAccount).subscribe({
        next:(data) => {
          this.savedBankAccount = data;
          alert("Account has been successfully saved !")
          this.newBankAccountFormGroup.reset();
          this.router.navigateByUrl("/bank-accounts")
        },
        error: (err) => {this.errorMessage = err.message}
      });

  }

  onCancel() {
    this.newBankAccountFormGroup.reset();
  }
}
