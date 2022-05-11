export class UserNoAccountDTO {
  private _name:string;
  private _email:string;
  private _idCard:string;
  private _phone:string;


  constructor(name: string, email: string, idCard: string, phone: string) {
    this._name = name;
    this._email = email;
    this._idCard = idCard;
    this._phone = phone;
  }


  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get idCard(): string {
    return this._idCard;
  }

  set idCard(value: string) {
    this._idCard = value;
  }

  get phone(): string {
    return this._phone;
  }

  set phone(value: string) {
    this._phone = value;
  }
}
