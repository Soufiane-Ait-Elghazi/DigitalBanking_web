import {Customer} from "../model/customer.model";

export enum CustomerActionsTypes {
  EDIT_CUSTOMER ="[Customer] Edit customer",
  VIEW_CUSTOMER ="[Customer] View customer",

}
export interface ActionEvent{
  type:CustomerActionsTypes,
  payload:Customer
}
