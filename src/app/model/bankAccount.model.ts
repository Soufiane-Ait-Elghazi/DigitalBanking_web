export interface BankAccount{
  id : number ;
  rib : string ;
  accountType : string;
  balance :number;
  creationDate : Date;
  accountStatus : string;
  currency : string ;
  overDraft : number;
  interestRate:number;
  custId: number;

}
