import {Ward} from './Ward';

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
