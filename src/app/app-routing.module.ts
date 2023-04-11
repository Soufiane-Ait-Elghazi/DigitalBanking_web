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
import {OperationsComponent} from "./components/operationComponents/operations/operations.component";
import {ViewAccountComponent} from "./components/accountComponents/view-account/view-account.component";
import {EditAccountComponent} from "./components/accountComponents/edit-account/edit-account.component";
import {ViewOperationComponent} from "./components/operationComponents/view-operation/view-operation.component";
import {LoginComponent} from "./components/login/login.component";
import {UsersComponent} from "./components/userComponents/users/users.component";

const routes:Routes=[
  {path:"home",component: HomeComponent},
  {path:"customers",component: CustomersComponent},
  {path:"bank-accounts",component: AccountsComponent},
  {path:"operations",component: OperationsComponent},
  {path:"new-customer",component: NewCustomerComponent},
  {path:"new-account",component: NewAccountComponent},
  {path:"new-operation",component: OperationsComponent},
  {path:"customer-accounts/:id",component: CustomerAccountsComponent},
  {path:"view-customer/:id",component: ViewCustomerComponent},
  {path:"view-account/:id",component: ViewAccountComponent},
  {path:"view-operation/:id",component: ViewOperationComponent},
  {path:"edit-customer/:id",component: EditCustomerComponent},
  {path:"edit-account/:id",component: EditAccountComponent},
  {path:"accounts",component: AccountsComponent},
  {path:"users",component: UsersComponent},
  {path:"login",component: LoginComponent},
  {path:"",redirectTo:"/home" ,pathMatch:"full"},
  {path:"**",redirectTo:"/home" ,pathMatch:"full"}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
