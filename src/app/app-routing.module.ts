import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./components/customers/customers.component";
import {AccountsComponent} from "./components/accounts/accounts.component";
import {HomeComponent} from "./components/home/home.component";
import {NewCustomerComponent} from "./components/new-customer/new-customer.component";

const routes:Routes=[
  {path:"home",component: HomeComponent},
  {path:"customers",component: CustomersComponent},
  {path:"new-customer",component: NewCustomerComponent},
  {path:"accounts",component: AccountsComponent},
  {path:"",redirectTo:"/home" ,pathMatch:"full"}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
