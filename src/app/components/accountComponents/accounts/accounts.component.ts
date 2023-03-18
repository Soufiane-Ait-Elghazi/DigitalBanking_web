import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {EventDriverService} from "../../../services/event.driver.service";
import {BankAccount} from "../../../model/bankAccount.model";
import {BankAccountService} from "../../../services/bank-account.service";
import {CustomerActionsTypes} from "../../../state/customer.state";



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
  p: number = 1;


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
        this.p=1
      },
      error: (err) => {this.errorMessage = err.message}
    });
  }


  onDeleteBankAccount(id: number) {
    let conf = confirm("Are you sure ?")
    if(!conf) return;
    this.bankAccountService.deleteAccount(id).subscribe({
      next: (data) => {
        this.deletedBankAccount = data;
        this.onGetBankAccounts()
      },
      error: (err) => {this.errorMessage = err.message}
    });
  }

  onEditBankAccount(id: number) {
    this.router.navigateByUrl("edit-account/"+id)
  }

  onViewAccount(id: number) {

    this.router.navigateByUrl("view-account/"+id)
  }
}

