import { Component } from '@angular/core';
import {Customer} from "../../../model/customer.model";
import {EventDriverService} from "../../../services/event.driver.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../../../services/customer.service";
import {BankAccount} from "../../../model/bankAccount.model";
import {BankAccountService} from "../../../services/bank-account.service";
import {Observable} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent {

  customer! : Customer ;
  bankAccounts! : Array<BankAccount>
  errorMessage!: string;
  p: number = 1;
  constructor(private eventDriverService:EventDriverService,
              private route:ActivatedRoute,
              private bankAccountService:BankAccountService,
              private router:Router){

  }
  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.bankAccountService.getCustomerBankAccount(id).subscribe({
      next: (data) => {this.bankAccounts = data;},
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
