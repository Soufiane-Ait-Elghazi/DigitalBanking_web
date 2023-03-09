import { Component } from '@angular/core';
import {Customer} from "../../../model/customer.model";
import {EventDriverService} from "../../../services/event.driver.service";
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../../../services/customer.service";
import {OperationsComponent} from "../operations/operations.component";
import {OperationService} from "../../../services/operation.service";
import {AccountOperation} from "../../../model/operation";

@Component({
  selector: 'app-view-operation',
  templateUrl: './view-operation.component.html',
  styleUrls: ['./view-operation.component.css']
})
export class ViewOperationComponent {

  errorMessage!: string;
  operation!: AccountOperation;
  constructor(private eventDriverService:EventDriverService,
              private route:ActivatedRoute,
              private operationService:OperationService){

  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.operationService.getOperation(id).subscribe((data:AccountOperation)=>{
      this.operation=data;
    },error => {
      this.errorMessage = error.message;
    });


  }
}
