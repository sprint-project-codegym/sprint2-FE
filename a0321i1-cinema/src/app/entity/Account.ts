import {User} from './User';

export interface Account {
  username: string;
  password: string;
  registerDay: string;
  point: string;
  accountStatus: string;
  user: User;
}
