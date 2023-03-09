import { Component } from '@angular/core';
import {EventDriverService} from "../../../services/event.driver.service";
import {ActivatedRoute} from "@angular/router";
import {BankAccount} from "../../../model/bankAccount.model";
import {BankAccountService} from "../../../services/bank-account.service";

@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.css']
})
export class ViewAccountComponent {

  account! : BankAccount ;
  errorMessage!: string;
  constructor(private eventDriverService:EventDriverService,
              private route:ActivatedRoute,
              private bankAccountService:BankAccountService){

  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.bankAccountService.getBankAccount(id).subscribe((data:BankAccount)=>{
      this.account=data;
    },error => {
      this.errorMessage = error.message;
    });


  }
}
