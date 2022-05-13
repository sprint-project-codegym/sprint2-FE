import {Ticket} from '../entity/Ticket';
import {Room} from '../entity/Room';
import {Movie} from '../entity/Movie';
import {ShowTime} from '../entity/ShowTime';

export interface InformationMovieTicketDTO {
  movieTicketId: number;
  showDate: string;
  ticketPrice: number;
  projectionType: string;
  room: Room;
  movie: Movie;
  showTime: ShowTime;
  ticketSet: Ticket[];
}
