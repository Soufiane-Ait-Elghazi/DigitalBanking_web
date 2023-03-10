import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../../services/customer.service";
import {Customer} from "../../../model/customer.model";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventDriverService} from "../../../services/event.driver.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorDto} from "../../../model/error.model";

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit{

  editCustomerFormGroup!: FormGroup;
  editCustomer!: Customer;
  errorMessage!: String;
  errorMessages!: String[];
 error!: ErrorDto;
  constructor(private eventDriverService:EventDriverService,private route:ActivatedRoute, private router : Router, private customerService:CustomerService , private fb : FormBuilder) {
    this.editCustomerFormGroup = this.fb.group({
      id : this.fb.control(""),
      firstName : this.fb.control(""),
      lastName : this.fb.control(""),
      cin : this.fb.control(""),
      birthDate : this.fb.control(""),
      email : this.fb.control(""),
      phoneNumber : this.fb.control(""),
      address : this.fb.control(""),
      city : this.fb.control(""),
      countryCode : this.fb.control(""),
    })
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.customerService.getCustomer(id).subscribe((data:Customer)=>{
      this.editCustomer=data;
      this.editCustomerFormGroup.setValue(this.editCustomer);
    },error => {
      this.errorMessage = error.message;
    });

  }

  onSaveCustomer() {
    let cust :Customer = this.editCustomerFormGroup.value ;
    this.customerService.editCustomer(cust).subscribe({
      next:(data) => {
        this.editCustomer = data;
        alert("Customer has been successfully saved !")
        this.router.navigateByUrl("/customers")
        this.editCustomerFormGroup.reset();
      },
      error: (err: HttpErrorResponse) => {
        if(err.status == 400) {
          this.error = err.error
          console.log(this.error.httpCode);
          console.log(this.error.errorCode);
          console.log(this.error.errors);
          this.errorMessage = this.error.message
          this.errorMessages == this.error.errors
        }
      }
    });
  }


}
