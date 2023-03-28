import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {OperationService} from "../../../services/operation.service";
import {AccountOperation} from "../../../model/operation";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorDto} from "../../../model/error.model";




@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements  OnInit{

  newOperationFormGroup!: FormGroup;



  accountOperations!: Array<AccountOperation>;
  p: number = 1;
  end!: number;
  errorMessage1!: String;
  errorMessage2!: String;
  errorMessage3!: String;
  error3!: ErrorDto;
  errorMessages3!: string[];
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
        error: (err) => {this.errorMessage2 = err.message}
      });
  }

  constructor(private operationService : OperationService, private fb:FormBuilder,private router :Router) {
    this.newOperationFormGroup = this.fb.group({
      operationType : this.fb.control(null),
      accountSourceRIB : this.fb.control(""),
      accountDestinationRIB : this.fb.control(""),
      amount : this.fb.control(null),
      description : this.fb.control("",[Validators.required,Validators.minLength(4)])
    })
  }

  onSaveOperation() {
    let operationDto = this.newOperationFormGroup.value ;
    operationDto.amount = this.newOperationFormGroup.controls['amount'].value
    if(this.newOperationFormGroup.controls['operationType'].value =="DEBIT"){
      this.operationService.saveDebitOperation(operationDto).subscribe({
        next:(data) => {
          alert("Operation has been successfully saved !")
          this.newOperationFormGroup.reset();
          this.ngOnInit()
        },
        error: (err: HttpErrorResponse) => {
          if(err.status == 400) {
            this.error3 = err.error
            this.errorMessages3 = this.error3.errors
            this.errorMessage3 = this.error3.errorDescription
          }
        }
      });
    }
    if(this.newOperationFormGroup.controls['operationType'].value =="CREDIT"){
      this.operationService.saveCreditOperation(operationDto).subscribe({
        next:(data) => {
          alert("Operation has been successfully saved !")
          this.newOperationFormGroup.reset();
          this.ngOnInit()
        },
        error: (err: HttpErrorResponse) => {
          if(err.status == 400) {
            this.error3 = err.error
            this.errorMessages3 = this.error3.errors
            this.errorMessage3 = this.error3.errorDescription
          }
        }
      });
    }
    if(this.newOperationFormGroup.controls['operationType'].value =="TRANSFER"){
      this.operationService.saveTransferOperation(operationDto).subscribe({
        next:(data) => {
          alert("Operation has been successfully saved !")
          this.newOperationFormGroup.reset();
          this.ngOnInit()

        },
        error: (err: HttpErrorResponse) => {
          if(err.status == 400) {
            this.error3 = err.error
            this.errorMessages3 = this.error3.errors
            this.errorMessage3 = this.error3.errorDescription
          }
        }
      });
    }

  }


  onViewOpertion(id: number) {
    this.router.navigateByUrl("/view-operation/"+id)
  }

  onGetOperations() {
    this.newOperationFormGroup.reset()
    this.ngOnInit()
  }
}
