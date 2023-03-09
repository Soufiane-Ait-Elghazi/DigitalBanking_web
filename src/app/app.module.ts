import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CustomersComponent } from './components/customerComponents/customers/customers.component';
import { AccountsComponent } from './components/accountComponents/accounts/accounts.component';
import { HomeComponent } from './components/home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {NewCustomerComponent } from './components/customerComponents/new-customer/new-customer.component';
import {ViewCustomerComponent } from './components/customerComponents/view-customer/view-customer.component';
import {EditCustomerComponent } from './components/customerComponents/edit-customer/edit-customer.component';
import {NgxPaginationModule} from "ngx-pagination";
import {NewAccountComponent} from "./components/accountComponents/new-account/new-account.component";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CustomerAccountsComponent } from './components/accountComponents/customer-accounts/customer-accounts.component';
import { OperationsComponent } from './components/operationComponents/operations/operations.component';
import { EditAccountComponent } from './components/accountComponents/edit-account/edit-account.component';
import { ViewAccountComponent } from './components/accountComponents/view-account/view-account.component';
import { ViewOperationComponent } from './components/operationComponents/view-operation/view-operation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CustomersComponent,
    NewCustomerComponent,
    ViewCustomerComponent,
    EditCustomerComponent,
    AccountsComponent,
    NewAccountComponent,
    SidebarComponent,
    FooterComponent,
    CustomerAccountsComponent,
    OperationsComponent,
    EditAccountComponent,
    ViewAccountComponent,
    ViewOperationComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
