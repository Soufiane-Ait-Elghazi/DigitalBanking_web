import {BankAccountType} from "./BankAccountType";

export interface BankAccount{

  id:              number;
  rib:             string;
  balance:         number;
  creationDate:    Date;
  accountStatus:   string;
  currency:        string;
  custId: number;
  cin:          string;
  bankAccountType: BankAccountType;
}


