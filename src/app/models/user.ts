import {Authority, Role} from './role';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  authorities: Authority[]
}
