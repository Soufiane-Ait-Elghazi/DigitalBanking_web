export interface Customer{
  id : number ;
  firstName : string ;
  lastName : string ;
  cin : string ;
  birthDate : string ;
  email : string ;
  phoneNumber : string ;
  address : string;
  city : string;
  countryCode : any;

}


export class ClientNotFound {
  httpCode:   number  = 1000;
  errorCodes: string = "BANK_CUSTOMER_NOT_FOUND";
  message:    string ="Customer not found";
  errors:     any[] =[];
}
