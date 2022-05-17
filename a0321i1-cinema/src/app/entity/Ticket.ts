import {Seat} from './Seat';
import {User} from './User';
// @ts-ignore
import {MovieTicket} from './MovieTicket';

export interface Ticket {
  ticketId: number;
  timeCreate: string;
  user: User;
  seat: Seat;
  ticketStatus: string;
  movieTicket: MovieTicket;
}
