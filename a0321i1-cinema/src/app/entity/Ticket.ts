import {Seat} from './Seat';
import {User} from './User';
// @ts-ignore
import {MovieTicket} from './MovieTicket';

export class Ticket {
  // tslint:disable-next-line:variable-name
  private _ticketId: number;
  // tslint:disable-next-line:variable-name
  private _timeCreate: string;
  // tslint:disable-next-line:variable-name
  private _user: User;
  // tslint:disable-next-line:variable-name
  private _seat: Seat;
  // tslint:disable-next-line:variable-name
  private _ticketStatus: string;
  // tslint:disable-next-line:variable-name
  private _movieTicket: MovieTicket;


  constructor() {
  }


  get ticketId(): number {
    return this._ticketId;
  }

  set ticketId(value: number) {
    this._ticketId = value;
  }

  get timeCreate(): string {
    return this._timeCreate;
  }

  set timeCreate(value: string) {
    this._timeCreate = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get seat(): Seat {
    return this._seat;
  }

  set seat(value: Seat) {
    this._seat = value;
  }

  get ticketStatus(): string {
    return this._ticketStatus;
  }

  set ticketStatus(value: string) {
    this._ticketStatus = value;
  }

  get movieTicket(): MovieTicket {
    return this._movieTicket;
  }

  set movieTicket(value: MovieTicket) {
    this._movieTicket = value;
  }
}
