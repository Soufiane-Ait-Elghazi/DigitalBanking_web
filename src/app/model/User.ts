export interface User {
  id:       number;
  username: string;
  actived:  boolean;
  roles:    Role[];
}

export interface Role {
  id:       number;
  roleName: string;
}
