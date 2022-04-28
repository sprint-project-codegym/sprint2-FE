import {Movie} from './Movie';
import {ShowTime} from './ShowTime';
// @ts-ignore
import {Room} from './Room';

export interface MovieTicket {
  movieTicketId: number;
  showDate: string;
  ticketPrice: number;
  room: Room;
  movie: Movie;
  showTime: ShowTime;
  projectionType: string;
}
