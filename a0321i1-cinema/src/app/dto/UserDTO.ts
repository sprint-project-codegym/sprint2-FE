import {Ward} from '../entity/Ward';

export class UserDTO {

  avatarUrl: string;
  birthday: string;
  email: string;
  gender: number;
  idCard: string;
  name: string;
  phone: string;
  username: string;
  ward: Ward;
  password: string;

  // tslint:disable-next-line:max-line-length
  constructor(avatarUrl: string, birthday: string, email: string, gender: number, idCard: string, name: string, phone: string, username: string, ward: Ward, password: string) {
    this.avatarUrl = avatarUrl;
    this.birthday = birthday;
    this.email = email;
    this.gender = gender;
    this.idCard = idCard;
    this.name = name;
    this.phone = phone;
    this.username = username;
    this.ward = ward;
    this.password = password;
  }
}
