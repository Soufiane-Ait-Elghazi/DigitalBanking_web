import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {OperationService} from "../../../services/operation.service";
import {AccountOperation} from "../../../model/operation";




@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements  OnInit{

  newOperationFormGroup!: FormGroup;

  errorMessage!: String;
  accountOperations!: Array<AccountOperation>;
  p: number = 1;
  end!: number;
  ngOnInit(): void {
      this.operationService.getOperations().subscribe({
        next:(data) => {
          this.accountOperations = data
          if((Math.trunc(this.accountOperations.length / 6)+1) == 0) {
            this.end = Math.trunc(this.accountOperations.length / 6)
          }else{
            this.end = Math.trunc(this.accountOperations.length / 6)+1
          }
        },
        error: (err) => {this.errorMessage = err.message}
      });
  }

  constructor(private operationService : OperationService, private fb:FormBuilder,private router :Router) {
    this.newOperationFormGroup = this.fb.group({
      operationType : this.fb.control(null),
      accountSourceRIB : this.fb.control(""),
      accountDestinationRIB : this.fb.control(""),
      amount : this.fb.control(0),
      description : this.fb.control("",[Validators.required,Validators.minLength(4)])
    })
  }

  onSaveOperation() {
    let operationDto = this.newOperationFormGroup.value ;
    if(this.newOperationFormGroup.controls['operationType'].value =="DEBIT"){
      this.operationService.saveDebitOperation(operationDto).subscribe({
        next:(data) => {
          alert("Operation has been successfully saved !")
          this.newOperationFormGroup.reset();
          this.router.navigateByUrl("/operations")
        },
        error: (error) => {
          if (error.status === 1000) {
            this.errorMessage = "Customer not found !!";
          } else if (error.status === 2000) {
              this.errorMessage = "Account not found !!";
          } else if (error.status === 6000) {
            this.errorMessage = "Balance not sufficient !!";
          } else {
            this.errorMessage = "Unexpected error";
          }
        }
      });
    }
    if(this.newOperationFormGroup.controls['operationType'].value =="CREDIT"){
      this.operationService.saveCreditOperation(operationDto).subscribe({
        next:(data) => {
          alert("Operation has been successfully saved !")
          this.newOperationFormGroup.reset();
          this.router.navigateByUrl("/operations")
        },
        error: (error) => {
          if (error.status === 1000) {
            this.errorMessage = "Customer not found !!";
          } else if (error.status === 2000) {
            this.errorMessage = "Account not found !!";
          } else if (error.status === 6000) {
            this.errorMessage = "Balance not sufficient !!";
          } else {
            this.errorMessage = "Unexpected error";
          }
        }
      });
    }
    if(this.newOperationFormGroup.controls['operationType'].value =="TRANSFER"){
      this.operationService.saveTransferOperation(operationDto).subscribe({
        next:(data) => {
          alert("Operation has been successfully saved !")
          this.newOperationFormGroup.reset();
          this.router.navigateByUrl("/operations")
        },
        error: (error) => {
          if (error.status === 1000) {
            this.errorMessage = "Customer not found !!";
          } else if (error.status === 2000) {
            this.errorMessage = "Account not found !!";
          } else if (error.status === 6000) {
            this.errorMessage = "Balance not sufficient !!";
          } else {
            this.errorMessage = "Unexpected error";
          }
        }
      });
    }

  }


  onViewOpertion(id: number) {
    this.router.navigateByUrl("/view-operation/"+id)
  }
}
