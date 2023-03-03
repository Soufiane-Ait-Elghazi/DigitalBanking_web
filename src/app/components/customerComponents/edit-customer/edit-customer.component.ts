import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../../services/customer.service";
import {Customer} from "../../../model/customer.model";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventDriverService} from "../../../services/event.driver.service";

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit{

  editCustomerFormGroup!: FormGroup;
  editCustomer!: Customer;
  errorMessage!: String;
  constructor(private eventDriverService:EventDriverService,private route:ActivatedRoute, private router : Router, private customerService:CustomerService , private fb : FormBuilder) {
    this.editCustomerFormGroup = this.fb.group({
      id : this.fb.control(""),
      name : this.fb.control("",[Validators.required,Validators.maxLength(10),Validators.minLength(4)]),
      email : this.fb.control("",[Validators.required,Validators.email]),
      address : this.fb.control("",[Validators.required,Validators.minLength(4)]),
      city : this.fb.control("",[Validators.required,Validators.maxLength(15),Validators.minLength(4)]),
      countryCode : this.fb.control("",[Validators.required,Validators.maxLength(3) ,Validators.minLength(3)])
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
      error: (err) => {this.errorMessage = err.message}
    });
  }


}
