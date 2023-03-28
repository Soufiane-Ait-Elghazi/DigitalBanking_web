import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BankAccount} from "../../../model/bankAccount.model";
import {BankAccountType} from "../../../model/BankAccountType";
import {BankAccountService} from "../../../services/bank-account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorDto} from "../../../model/error.model";

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit{
  editBankAccountFormGroup!: FormGroup;
  bankAccountTypes!: Array<BankAccountType>;
  editedAccount!: BankAccount;
  private savedBankAccount!: BankAccount;
  errorMessage!: String;
  error!: ErrorDto;
  errorMessages!: String[];
  private id!: number;

  constructor(private bankAccountService : BankAccountService,
              private fb:FormBuilder,
              private router :Router,
              private route :ActivatedRoute) {

    this.editBankAccountFormGroup = this.fb.group({
      balance : this.fb.control(""),
      accountType : this.fb.control(""),
      status :this.fb.control(""),
      currency : this.fb.control("")
    });
  }

  ngOnInit(): void {
    this.bankAccountService.getAccountTypes().subscribe({
      next:(data) => {
        this.bankAccountTypes = data ;
      },
      error: (err) => {this.errorMessage = err.message}
    });
    this.id = this.route.snapshot.params['id'];
    this.bankAccountService.getBankAccount(this.id).subscribe((data:BankAccount)=>{
      this.editedAccount=data;
      this.editBankAccountFormGroup.controls['balance'].setValue(this.editedAccount.balance);
      this.editBankAccountFormGroup.controls['accountType'].setValue(this.editedAccount.bankAccountType.id);
      this.editBankAccountFormGroup.controls['currency'].setValue(this.editedAccount.currency);
      this.editBankAccountFormGroup.controls['status'].setValue(this.editedAccount.accountStatus);
    },error => {
      this.errorMessage = error.message;
    });

  }

  onSaveBankAccount() {

    let bankAccountDto :BankAccount = this.editBankAccountFormGroup.value ;
    bankAccountDto.id = this.id;
    let bankAccountTypeId :number =this.editBankAccountFormGroup.controls['accountType'].value
    bankAccountDto.bankAccountType = this.bankAccountTypes[bankAccountTypeId - 1]
    bankAccountDto.cin =this.editedAccount.cin
    bankAccountDto.accountStatus =this.editBankAccountFormGroup.controls['status'].value
    this.bankAccountService.editAccount(bankAccountDto).subscribe({
      next:(data) => {
        this.savedBankAccount = data;
        alert("Account has been successfully edited !")
        this.editBankAccountFormGroup.reset();
        this.router.navigateByUrl("/bank-accounts")
      },
      error: (err: HttpErrorResponse) => {
        if(err.status == 400) {
          this.error = err.error
          this.errorMessage = this.error.errorDescription
          this.errorMessages == this.error.errors
        }
      }
    });

  }

  onCancel() {
    this.editBankAccountFormGroup.setValue(this.editedAccount);
  }

  updateStatus(status: string) {
    this.editBankAccountFormGroup.controls['status'].setValue(status);
  }
}
