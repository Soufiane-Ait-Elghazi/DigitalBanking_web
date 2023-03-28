import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BankAccountService} from "../../../services/bank-account.service";
import {BankAccount} from "../../../model/bankAccount.model";
import {BankAccountType} from "../../../model/BankAccountType";
import {Customer} from "../../../model/customer.model";
import {CustomerService} from "../../../services/customer.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorDto} from "../../../model/error.model";

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit{
  newBankAccountFormGroup!: FormGroup;
  savedBankAccount!: BankAccount;
  errorMessage!: String;
  bankAccountTypes!: Array<BankAccountType>;
  error!: ErrorDto;
  errorMessages!: String[];


  constructor(private bankAccountService : BankAccountService,
              private customerService:CustomerService,
              private fb:FormBuilder,
              private router :Router) {

    this.newBankAccountFormGroup = this.fb.group({
        balance : this.fb.control(""),
        accountType : this.fb.control(""),
        currency : this.fb.control(null),
        cin : this.fb.control("")

    });
  }

  ngOnInit(): void {
    this.bankAccountService.getAccountTypes().subscribe({
      next:(data) => {
        this.bankAccountTypes = data ;
      },
      error: (err) => {this.errorMessage = err.message}
    });
    }

  onSaveBankAccount() {
    let bankAccountDto :BankAccount = this.newBankAccountFormGroup.value ;
    let bankAccountTypeId :number =this.newBankAccountFormGroup.controls['accountType'].value
    bankAccountDto.bankAccountType = this.bankAccountTypes[bankAccountTypeId - 1]
    bankAccountDto.cin=this.newBankAccountFormGroup.controls['cin'].value
    this.bankAccountService.saveAccount(bankAccountDto).subscribe({
        next:(data) => {
          this.savedBankAccount = data;
          alert("Account has been successfully saved !")
          this.newBankAccountFormGroup.reset();
          this.router.navigateByUrl("/bank-accounts")
        },
      error: (err: HttpErrorResponse) => {
          if(err.status == 400) {
            this.error = err.error
            console.log(this.error.httpCode);
            console.log(this.error.errorID);
            console.log(this.error.errors);
            this.errorMessage = this.error.errorDescription
            this.errorMessages == this.error.errors
          }
        }
    });

  }

  onCancel() {
    this.newBankAccountFormGroup.reset();
  }
}
