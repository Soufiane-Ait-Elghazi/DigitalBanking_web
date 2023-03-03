import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./components/customerComponents/customers/customers.component";
import {AccountsComponent} from "./components/accountComponents/accounts/accounts.component";
import {HomeComponent} from "./components/home/home.component";
import {NewCustomerComponent} from "./components/customerComponents/new-customer/new-customer.component";
import {ViewCustomerComponent} from "./components/customerComponents/view-customer/view-customer.component";
import {EditCustomerComponent} from "./components/customerComponents/edit-customer/edit-customer.component";
import {NewAccountComponent} from "./components/accountComponents/new-account/new-account.component";
import {CustomerAccountsComponent} from "./components/accountComponents/customer-accounts/customer-accounts.component";

const routes:Routes=[
  {path:"home",component: HomeComponent},
  {path:"customers",component: CustomersComponent},
  {path:"bank-accounts",component: AccountsComponent},
  {path:"new-customer",component: NewCustomerComponent},
  {path:"new-account",component: NewAccountComponent},
  {path:"customer-accounts/:id",component: CustomerAccountsComponent},
  {path:"view-customer/:id",component: ViewCustomerComponent},
  {path:"edit-customer/:id",component: EditCustomerComponent},
  {path:"accounts",component: AccountsComponent},
  {path:"",redirectTo:"/home" ,pathMatch:"full"}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
