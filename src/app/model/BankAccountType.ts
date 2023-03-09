export interface BankAccountType {
  id:              number;
  type:            string;
  interestRate:    number;
  overDraft:       number;
  minBalance:      number;
  maxBalance:      number;
  maxBalanceInDay: number;
}
