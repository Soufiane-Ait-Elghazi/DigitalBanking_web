import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BankAccount} from "../../../model/bankAccount.model";
import {BankAccountType} from "../../../model/BankAccountType";
import {BankAccountService} from "../../../services/bank-account.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit{
  editBankAccountFormGroup!: FormGroup;
  errorMessage!: String;
  bankAccountTypes!: Array<BankAccountType>;
  editedAccount!: BankAccount;
  private savedBankAccount!: BankAccount;


  constructor(private bankAccountService : BankAccountService,
              private fb:FormBuilder,
              private router :Router,
              private route :ActivatedRoute) {

    this.editBankAccountFormGroup = this.fb.group({
      id : this.fb.control("",[Validators.required]),
      balance : this.fb.control("",[Validators.required]),
      accountType : this.fb.control("",[Validators.required ]),
      currency : this.fb.control("",[Validators.required])
    });
  }

  ngOnInit(): void {
    this.bankAccountService.getAccountTypes().subscribe({
      next:(data) => {
        this.bankAccountTypes = data ;
      },
      error: (err) => {this.errorMessage = err.message}
    });
    let id = this.route.snapshot.params['id'];
    this.bankAccountService.getBankAccount(id).subscribe((data:BankAccount)=>{
      this.editedAccount=data;
      this.editBankAccountFormGroup.controls['initialBalance'].setValue(this.editedAccount.balance);
    },error => {
      this.errorMessage = error.message;
    });

  }

  onSaveBankAccount() {
    let id = this.route.snapshot.params['id'];
    let bankAccountDto :BankAccount = this.editBankAccountFormGroup.value ;
    bankAccountDto.id = id;
    let bankAccountTypeId :number =this.editBankAccountFormGroup.controls['accountType'].value
    bankAccountDto.bankAccountType = this.bankAccountTypes[bankAccountTypeId - 1]
    this.bankAccountService.editAccount(bankAccountDto).subscribe({
      next:(data) => {
        this.savedBankAccount = data;
        alert("Account has been successfully edited !")
        this.editBankAccountFormGroup.reset();
        this.router.navigateByUrl("/bank-accounts")
      },
      error: (err) => {this.errorMessage = err.message}
    });

  }

  onCancel() {
    this.editBankAccountFormGroup.setValue(this.editedAccount);
  }
}
