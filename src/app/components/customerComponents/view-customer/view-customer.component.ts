import {Component, OnInit} from '@angular/core';
import {EventDriverService} from "../../../services/event.driver.service";
import {Customer} from "../../../model/customer.model";
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../../../services/customer.service";

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit{

  customer! : Customer ;
  errorMessage!: string;
  constructor(private eventDriverService:EventDriverService,
              private route:ActivatedRoute,
              private customerService:CustomerService){

  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.customerService.getCustomer(id).subscribe( (data: Customer) => {
      this.customer = data;
    },
      (error) => {
        if (error.status === 1000) {
          this.errorMessage = "Customer not found !!";
        } else {
          this.errorMessage = "Unexpected error";
        }
    });
  }

}
