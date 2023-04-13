export interface User {
  id:       number;
  username: string;
  actived:  boolean;
  roles:    Role[];
}
export interface UserForm {
  id:number
  username: string;
  password: string;
  confirmedPassword: string;

}



export interface Role {
  id:       number;
  roleName: string;
}
