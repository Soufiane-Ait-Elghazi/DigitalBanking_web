import {Customer} from "../model/customer.model";

export enum AppActionsTypes {
  GET_AUTHENTICATED_USER = "[string] Get authenticated user",

}
export interface ActionEvent{
  type:AppActionsTypes,
  payload?:any
}


export interface AppDataState<T> {
  data?:T,
  errorMessage?:string
}
