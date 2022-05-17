import {Ward} from './Ward';
import {Account} from "./Account";

export interface User {
  userId: number;
  name: string;
  birthday: string;
  gender: number;
  email: string;
  phone: string;
  idCard: string;
  avatarUrl: string;
  account: Account;
  ward: Ward;
}
